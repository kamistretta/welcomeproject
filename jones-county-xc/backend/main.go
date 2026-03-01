package main

import (
	"database/sql"
	"log"
	"net/http"
	"strconv"

	"jones-county-xc/db"

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

	// Paintings
	r.GET("/api/paintings", getPaintings)
	r.GET("/api/paintings/featured", getFeaturedPaintings)
	r.GET("/api/paintings/:id", getPaintingByID)
	r.POST("/api/paintings", createPainting)
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
	var input db.CreatePaintingParams
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := queries.CreatePainting(c.Request.Context(), input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": id, "message": "Painting created"})
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
	var input db.CreateCommissionParams
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := queries.CreateCommission(c.Request.Context(), input)
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
