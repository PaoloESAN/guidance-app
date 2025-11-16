package utils

import (
	"fmt"
	"log"
	"net/http"
	"strings"

	"github.com/PuerkitoBio/goquery"
)

type Job struct {
	Title    string `json:"title"`
	Company  string `json:"company"`
	Location string `json:"location"`
	Link     string `json:"link"`
}

func ScrapingOfertas(url string) ([]Job, error) {
	resp, err := http.Get(url)
	if err != nil {
		log.Printf("Error al realizar la petición: %v", err)
		return nil, err
	}
	defer resp.Body.Close()

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("estado HTTP %d", resp.StatusCode)
	}

	doc, err := goquery.NewDocumentFromReader(resp.Body)
	if err != nil {
		log.Printf("Error al parsear el HTML: %v", err)
		return nil, err
	}

	var jobs []Job

	doc.Find(".jobs-search__results-list li").Each(func(i int, s *goquery.Selection) {
		title := strings.TrimSpace(s.Find(".base-search-card__title").Text())
		company := strings.TrimSpace(s.Find(".base-search-card__subtitle").Text())
		location := strings.TrimSpace(s.Find(".job-search-card__location").Text())
		link, _ := s.Find("a").Attr("href")

		if title != "" {
			job := Job{
				Title:    title,
				Company:  company,
				Location: location,
				Link:     link,
			}
			jobs = append(jobs, job)
		}
	})

	if len(jobs) == 0 {
		return nil, fmt.Errorf("no se encontraron empleos")
	}

	return jobs, nil
}
