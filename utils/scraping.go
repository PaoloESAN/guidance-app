package utils

import (
	"fmt"
	"log"
	"net/http"

	"github.com/PuerkitoBio/goquery"
)

func ScrapingOfertas(url string) (string, error) {
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error al realizar la petición: %v", err)
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return "", fmt.Errorf("estado HTTP %d", resp.StatusCode)
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Printf("Error al parsear el HTML: %v", err)
		return "", err
	}

	title := doc.Find("title").First().Text()

	if title == "" {
		return "", fmt.Errorf("no se encontró título en la página")
	}

	return title, nil
}
