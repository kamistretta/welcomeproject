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
		c.JSON(http.StatusOK, gin.H{"message": "Jones County XC API"})
	})

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	r.GET("/api/athletes", getAthletes)
	r.GET("/api/athletes/:id", getAthleteByID)
	r.GET("/api/meets", getMeets)
	r.GET("/api/meets/:id/results", getResultsByMeet)
	r.GET("/api/fastest-times", getFastestTimes)
	r.POST("/api/results", createResult)

	r.Run(":8080")
}

func getAthletes(c *gin.Context) {
	athletes, err := queries.GetAllAthletes(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, athletes)
}

func getAthleteByID(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid athlete ID"})
		return
	}

	athlete, err := queries.GetAthleteByID(c.Request.Context(), int32(id))
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Athlete not found"})
		return
	}
	c.JSON(http.StatusOK, athlete)
}

func getMeets(c *gin.Context) {
	meets, err := queries.GetAllMeets(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, meets)
}

func getResultsByMeet(c *gin.Context) {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid meet ID"})
		return
	}

	results, err := queries.GetResultsByMeetID(c.Request.Context(), int32(id))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, results)
}

func getFastestTimes(c *gin.Context) {
	times, err := queries.GetTopTenFastestTimes(c.Request.Context())
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, times)
}

func createResult(c *gin.Context) {
	var input db.CreateResultParams
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	result, err := queries.CreateResult(c.Request.Context(), input)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	id, _ := result.LastInsertId()
	c.JSON(http.StatusCreated, gin.H{"id": id, "message": "Result created"})
}
