package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (a *App) startup(ctx context.Context) {
	// Perform your setup here
	godotenv.Load()
	a.ctx = ctx
}

// domReady is called after front-end resources have been loaded
func (a App) domReady(ctx context.Context) {
	// Add your action here
}

// beforeClose is called when the application is about to quit,
// either by clicking the window close button or calling runtime.Quit.
// Returning true will cause the application to continue, false will continue shutdown as normal.
func (a *App) beforeClose(ctx context.Context) (prevent bool) {
	return false
}

// shutdown is called at application termination
func (a *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

type Message struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

// Choice estructura para cada choice en la respuesta
type Choice struct {
	Index   int     `json:"index"`
	Message Message `json:"message"`
}

// GroqResponse estructura para deserializar la respuesta de Groq
type GroqResponse struct {
	Choices []Choice `json:"choices"`
}

// QueryGroqAPI envía una consulta a la API de Groq y retorna solo el contenido
func (a *App) QueryGroqAPI(query string) (string, error) {
	// Obtener la API key del archivo .env
	apikey := os.Getenv("GROQ_API_KEY")

	if apikey == "" {
		return "", fmt.Errorf("falta definir la variable de entorno GROQ_API_KEY")
	}

	url := "https://api.groq.com/openai/v1/chat/completions"

	// Body en formato Go > JSON
	payload := map[string]interface{}{
		"model": "llama-3.3-70b-versatile",
		"messages": []map[string]string{
			{
				"role":    "user",
				"content": query,
			},
		},
	}

	// Convertir a JSON
	jsonData, err := json.Marshal(payload)
	if err != nil {
		return "", fmt.Errorf("error al serializar JSON: %w", err)
	}

	// Crear la request
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonData))
	if err != nil {
		return "", fmt.Errorf("error al crear la request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("Authorization", "Bearer "+apikey)

	// Cliente HTTP
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", fmt.Errorf("error al hacer la request: %w", err)
	}
	defer resp.Body.Close()

	// Leer respuesta
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("error al leer la respuesta: %w", err)
	}

	// Deserializar JSON a estructura
	var response GroqResponse
	err = json.Unmarshal(body, &response)
	if err != nil {
		return "", fmt.Errorf("error al deserializar la respuesta: %w", err)
	}

	// Retornar solo el content del primer choice
	if len(response.Choices) > 0 {
		return response.Choices[0].Message.Content, nil
	}

	return "", fmt.Errorf("no se encontraron choices en la respuesta")
}
