package main

import (
	"context"
	"fmt"
	"guidance-app/utils"

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

func (a *App) QueryGroqAPI(query string) (string, error) {
	return utils.GroqApi(query)
}

func (a *App) Scraping(url string) ([]utils.Job, error) {
	return utils.ScrapingOfertas(url)
}

// ObtenerTerminoBusqueda analiza los trades seleccionados y retorna el mejor término de búsqueda
func (a *App) ObtenerTerminoBusqueda(tradesSeleccionados []string) string {
	return utils.ObtenerTerminoBusqueda(tradesSeleccionados)
}

// ObtenerTerminoBusquedaConCategoria retorna el término de búsqueda junto con su categoría
func (a *App) ObtenerTerminoBusquedaConCategoria(tradesSeleccionados []string) map[string]string {
	return utils.ObtenerTerminoBusquedaConCategoria(tradesSeleccionados)
}

// ObtenerTodosLosTerminos retorna todos los términos de búsqueda posibles
func (a *App) ObtenerTodosLosTerminos() map[string]string {
	return utils.ObtenerTodosLosTerminos()
}

// ObtenerTrayectorias retorna las posibles trayectorias de carrera basadas en los oficios seleccionados
func (a *App) ObtenerTrayectorias(tradesSeleccionados []string) []string {
	return utils.ObtenerTrayectorias(tradesSeleccionados)
}

// ObtenerInfoCompleta retorna información completa para la búsqueda de empleo
func (a *App) ObtenerInfoCompleta(tradesSeleccionados []string) map[string]interface{} {
	return utils.ObtenerInfoCompleta(tradesSeleccionados)
}
