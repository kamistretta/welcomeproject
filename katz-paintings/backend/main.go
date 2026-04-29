package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"

	"katz-paintings/db"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var queries *db.Queries

func main() {
	// Connect to MySQL
	database, err := sql.Open("mysql", "xc_app:xc_password@tcp(localhost:3306)/jones_county_xc?parseTime=true")
	if err != nil {
		log.Fatal("Failed to connect to database:", err)
	}
	defer database.Close()

	// Verify connection
	if err := database.Ping(); err != nil {
		log.Fatal("Failed to ping database:", err)
	}
	log.Println("Connected to MySQL database")

	queries = db.New(database)

	r := gin.Default()

	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"message": "Paintingz By Kat API"})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Image upload
	r.POST("/api/upload", uploadImage)

	// Paintings
	r.GET("/api/paintings", getPaintings)
	r.GET("/api/paintings/featured", getFeaturedPaintings)
	r.GET("/api/paintings/:id", getPaintingByID)
	r.POST("/api/paintings", createPainting)
	r.PUT("/api/paintings/:id", updatePainting)
	r.DELETE("/api/paintings/:id", deletePainting)

	// Commissions
	r.POST("/api/commissions", createCommission)
	r.GET("/api/commissions", getAllCommissions)
	r.PUT("/api/commissions/:id", updateCommissionStatus)
	r.POST("/api/commissions/:id/images", createReferenceImage)

	r.Run(":8080")
}

func getPaintings(c *gin.Context) {
	style := c.Query("style")

	if style != "" {
		paintings, err := queries.GetPaintingsByStyle(c.Request.Context(), style)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, paintings)
		return
	}

	paintings, err := queries.GetAllPaintings(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, paintings)
}

func getFeaturedPaintings(c *gin.Context) {
	paintings, err := queries.GetFeaturedPaintings(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, paintings)
}

func getPaintingByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid painting ID"})
		return
	}

	painting, err := queries.GetPaintingByID(c.Request.Context(), int32(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Painting not found"})
		return
	}
	c.JSON(http.StatusOK, painting)
}

func createPainting(c *gin.Context) {
	var input struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description"`
		Style       string `json:"style" binding:"required"`
		Medium      string `json:"medium"`
		ImageUrl    string `json:"image_url" binding:"required"`
		Size        string `json:"size"`
		Featured    bool   `json:"featured"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := queries.CreatePainting(c.Request.Context(), db.CreatePaintingParams{
		Title:       input.Title,
		Description: sql.NullString{String: input.Description, Valid: input.Description != ""},
		Style:       input.Style,
		Medium:      sql.NullString{String: input.Medium, Valid: input.Medium != ""},
		ImageUrl:    input.ImageUrl,
		Size:        sql.NullString{String: input.Size, Valid: input.Size != ""},
		Featured:    input.Featured,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": id, "message": "Painting created"})
}

func uploadImage(c *gin.Context) {
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "No file provided"})
		return
	}

	ext := filepath.Ext(file.Filename)
	filename := fmt.Sprintf("%d%s", time.Now().UnixNano(), ext)
	uploadDir := "/var/www/html/uploads"

	if err := os.MkdirAll(uploadDir, 0755); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create upload directory"})
		return
	}

	dst := filepath.Join(uploadDir, filename)
	if err := c.SaveUploadedFile(file, dst); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to save file"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"url": "/uploads/" + filename})
}

func updatePainting(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid painting ID"})
		return
	}

	var input struct {
		Title       string `json:"title" binding:"required"`
		Description string `json:"description"`
		Style       string `json:"style" binding:"required"`
		Medium      string `json:"medium"`
		Size        string `json:"size"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = queries.UpdatePainting(c.Request.Context(), db.UpdatePaintingParams{
		Title:       input.Title,
		Description: sql.NullString{String: input.Description, Valid: input.Description != ""},
		Style:       input.Style,
		Medium:      sql.NullString{String: input.Medium, Valid: input.Medium != ""},
		Size:        sql.NullString{String: input.Size, Valid: input.Size != ""},
		ID:          int32(id),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Painting updated"})
}

func deletePainting(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid painting ID"})
		return
	}

	if err := queries.DeletePainting(c.Request.Context(), int32(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Painting deleted"})
}

func createCommission(c *gin.Context) {
	var input struct {
		Name            string `json:"name" binding:"required"`
		Email           string `json:"email" binding:"required"`
		Phone           string `json:"phone"`
		Style           string `json:"style" binding:"required"`
		Description     string `json:"description" binding:"required"`
		SpecialRequests string `json:"special_requests"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := queries.CreateCommission(c.Request.Context(), db.CreateCommissionParams{
		Name:            input.Name,
		Email:           input.Email,
		Phone:           sql.NullString{String: input.Phone, Valid: input.Phone != ""},
		Style:           input.Style,
		Description:     input.Description,
		SpecialRequests: sql.NullString{String: input.SpecialRequests, Valid: input.SpecialRequests != ""},
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": id, "message": "Commission request submitted"})
}

func getAllCommissions(c *gin.Context) {
	commissions, err := queries.GetAllCommissions(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, commissions)
}

func updateCommissionStatus(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid commission ID"})
		return
	}

	var input struct {
		Status string `json:"status"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err = queries.UpdateCommissionStatus(c.Request.Context(), db.UpdateCommissionStatusParams{
		Status: sql.NullString{String: input.Status, Valid: true},
		ID:     int32(id),
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Commission status updated"})
}

func createReferenceImage(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid commission ID"})
		return
	}

	var input struct {
		ImageUrl string `json:"image_url"`
	}
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := queries.CreateReferenceImage(c.Request.Context(), db.CreateReferenceImageParams{
		CommissionID: int32(id),
		ImageUrl:     input.ImageUrl,
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	imgID, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": imgID, "message": "Reference image added"})
}
