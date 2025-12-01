package utils

import (
	"sort"
	"strings"
)

type Nodo struct {
	Nombre          string
	Conexiones      map[string]int 
	Categoria       string
	TerminoBusqueda string   
	Trayectorias    []string 
}

type CombinacionOficios struct {
	Oficios         []string 
	TerminoResultado string  
	Prioridad       int      
}

type GrafoOficios struct {
	Nodos         map[string]*Nodo
	Combinaciones []CombinacionOficios
}

func NuevoGrafoOficios() *GrafoOficios {
	g := &GrafoOficios{
		Nodos: make(map[string]*Nodo),
	}

	oficios := map[string]struct {
		Categoria       string
		TerminoBusqueda string
		Trayectorias    []string
	}{
		"electrician": {
			"técnico",
			"técnico electricista",
			[]string{"instalador eléctrico", "técnico en automatización", "supervisor eléctrico"},
		},
		"carpentry": {
			"construcción",
			"carpintero ebanista",
			[]string{"maestro carpintero", "diseñador de muebles", "instalador de acabados"},
		},
		"plumbing": {
			"técnico",
			"técnico gasfitero plomero",
			[]string{"instalador sanitario", "técnico en gas", "supervisor de instalaciones"},
		},
		"masonry": {
			"construcción",
			"maestro albañil construcción",
			[]string{"maestro de obra", "encofrador", "supervisor de construcción"},
		},
		"cooking": {
			"servicios",
			"cocinero chef gastronomía",
			[]string{"chef profesional", "pastelero", "supervisor de cocina"},
		},
		"hairdressing": {
			"servicios",
			"estilista peluquero cosmetología",
			[]string{"estilista profesional", "colorista", "barbero"},
		},
		"mechanics": {
			"técnico",
			"técnico mecánico automotriz",
			[]string{"mecánico especializado", "técnico en motores", "supervisor de taller"},
		},
		"welding": {
			"técnico",
			"soldador industrial",
			[]string{"soldador especializado", "técnico en estructuras metálicas", "inspector de soldadura"},
		},
		"gardening": {
			"servicios",
			"jardinero paisajista",
			[]string{"diseñador de jardines", "técnico en áreas verdes", "supervisor de mantenimiento"},
		},
		"cleaning": {
			"servicios",
			"limpieza mantenimiento",
			[]string{"supervisor de limpieza", "técnico de mantenimiento", "coordinador de servicios"},
		},
		"security": {
			"servicios",
			"agente seguridad vigilante",
			[]string{"supervisor de seguridad", "jefe de seguridad", "técnico en sistemas de seguridad"},
		},
		"care": {
			"servicios",
			"cuidador asistente auxiliar",
			[]string{"auxiliar de enfermería", "cuidador especializado", "asistente terapéutico"},
		},
		"sales": {
			"comercial",
			"vendedor asesor comercial",
			[]string{"ejecutivo de ventas", "supervisor comercial", "asesor de negocios"},
		},
		"logistics": {
			"comercial",
			"logística almacén operador",
			[]string{"jefe de almacén", "coordinador logístico", "operador de montacargas"},
		},
	}

	for nombre, info := range oficios {
		g.Nodos[nombre] = &Nodo{
			Nombre:          nombre,
			Conexiones:      make(map[string]int),
			Categoria:       info.Categoria,
			TerminoBusqueda: info.TerminoBusqueda,
			Trayectorias:    info.Trayectorias,
		}
	}

	conexiones := []struct {
		origen  string
		destino string
		peso    int
	}{
		{"electrician", "plumbing", 8},
		{"electrician", "mechanics", 9},
		{"electrician", "welding", 7},
		{"plumbing", "masonry", 7},
		{"plumbing", "welding", 6},
		{"mechanics", "welding", 10},
		{"mechanics", "electrician", 9},

		{"carpentry", "masonry", 9},
		{"carpentry", "plumbing", 6},
		{"carpentry", "welding", 7},
		{"masonry", "plumbing", 8},

		{"cooking", "hairdressing", 4},
		{"cooking", "care", 6},
		{"cooking", "cleaning", 7},
		{"hairdressing", "care", 5},
		{"cleaning", "care", 8},
		{"cleaning", "gardening", 7},
		{"gardening", "cleaning", 7},
		{"security", "cleaning", 5},
		{"security", "logistics", 7},
		{"security", "care", 4},

		{"sales", "logistics", 8},
		{"sales", "care", 5},
		{"logistics", "cleaning", 6},
		{"logistics", "security", 7},

		{"gardening", "masonry", 5},
		{"carpentry", "welding", 6},
		{"masonry", "welding", 6},
	}

	for _, c := range conexiones {
		if nodoOrigen, existe := g.Nodos[c.origen]; existe {
			nodoOrigen.Conexiones[c.destino] = c.peso
		}
		if nodoDestino, existe := g.Nodos[c.destino]; existe {
			nodoDestino.Conexiones[c.origen] = c.peso
		}
	}

	g.Combinaciones = []CombinacionOficios{
		{[]string{"electrician", "mechanics"}, "técnico electromecánico industrial", 100},
		{[]string{"electrician", "welding"}, "técnico electricista industrial", 95},
		{[]string{"mechanics", "welding"}, "técnico mecánico soldador industrial", 100},
		{[]string{"electrician", "mechanics", "welding"}, "técnico mantenimiento industrial", 150},
		{[]string{"electrician", "plumbing"}, "técnico instalaciones eléctricas sanitarias", 90},
		{[]string{"plumbing", "welding"}, "técnico instalador soldador", 85},
		{[]string{"mechanics", "electrician", "plumbing"}, "técnico mantenimiento general", 130},

		{[]string{"carpentry", "masonry"}, "maestro constructor acabados", 95},
		{[]string{"carpentry", "welding"}, "carpintero metálico estructuras", 90},
		{[]string{"masonry", "plumbing"}, "maestro obra instalaciones", 90},
		{[]string{"carpentry", "masonry", "plumbing"}, "maestro constructor integral", 140},
		{[]string{"masonry", "welding"}, "técnico construcción estructuras", 85},
		{[]string{"carpentry", "masonry", "welding"}, "maestro constructor estructuras metálicas", 135},

		{[]string{"cooking", "cleaning"}, "auxiliar cocina limpieza", 80},
		{[]string{"cleaning", "care"}, "asistente cuidado mantenimiento hogar", 90},
		{[]string{"security", "cleaning"}, "personal mantenimiento seguridad", 75},
		{[]string{"gardening", "cleaning"}, "mantenimiento áreas verdes limpieza", 85},
		{[]string{"cooking", "care"}, "auxiliar nutrición cuidado personas", 85},
		{[]string{"hairdressing", "care"}, "técnico cosmetología cuidado personal", 80},
		{[]string{"cleaning", "gardening", "security"}, "personal mantenimiento integral", 120},
		{[]string{"cooking", "cleaning", "care"}, "auxiliar servicios generales hogar", 115},

		{[]string{"sales", "logistics"}, "operador comercial logística ventas", 90},
		{[]string{"logistics", "security"}, "operador almacén seguridad", 85},
		{[]string{"sales", "care"}, "asesor ventas atención cliente", 80},
		{[]string{"sales", "logistics", "security"}, "coordinador operaciones comerciales", 125},

		{[]string{"electrician", "security"}, "técnico sistemas seguridad electrónica", 85},
		{[]string{"plumbing", "gardening"}, "técnico instalaciones riego", 80},
		{[]string{"mechanics", "logistics"}, "operador maquinaria montacargas", 85},
		{[]string{"carpentry", "sales"}, "vendedor muebles carpintería", 70},
		{[]string{"cooking", "sales"}, "asesor gastronomía alimentos", 70},
	}

	return g
}

func contieneSubconjunto(set, subset []string) bool {
	setMap := make(map[string]bool)
	for _, s := range set {
		setMap[s] = true
	}
	for _, s := range subset {
		if !setMap[s] {
			return false
		}
	}
	return true
}

func ObtenerTerminoBusqueda(tradesSeleccionados []string) string {
	if len(tradesSeleccionados) == 0 {
		return "empleo trabajo"
	}

	grafo := NuevoGrafoOficios()

	if len(tradesSeleccionados) == 1 {
		if nodo, existe := grafo.Nodos[tradesSeleccionados[0]]; existe {
			return nodo.TerminoBusqueda
		}
		return "empleo trabajo"
	}

	var mejorCombinacion *CombinacionOficios
	mejorPrioridad := -1

	for i := range grafo.Combinaciones {
		comb := &grafo.Combinaciones[i]
		if contieneSubconjunto(tradesSeleccionados, comb.Oficios) {
			prioridadEfectiva := comb.Prioridad + (len(comb.Oficios) * 10)
			if prioridadEfectiva > mejorPrioridad {
				mejorPrioridad = prioridadEfectiva
				mejorCombinacion = comb
			}
		}
	}

	if mejorCombinacion != nil {
		return mejorCombinacion.TerminoResultado
	}

	puntuaciones := make(map[string]int)

	for _, trade := range tradesSeleccionados {
		nodo, existe := grafo.Nodos[trade]
		if !existe {
			continue
		}

		puntuaciones[trade] = 10

		for _, otroTrade := range tradesSeleccionados {
			if trade == otroTrade {
				continue
			}
			if peso, conectado := nodo.Conexiones[otroTrade]; conectado {
				puntuaciones[trade] += peso
			}
		}
	}

	mejorTrade := ""
	mejorPuntuacion := -1

	for trade, puntuacion := range puntuaciones {
		if puntuacion > mejorPuntuacion {
			mejorPuntuacion = puntuacion
			mejorTrade = trade
		}
	}

	if nodo, existe := grafo.Nodos[mejorTrade]; existe {
		return nodo.TerminoBusqueda
	}

	return "empleo trabajo"
}

func ObtenerTerminoBusquedaConCategoria(tradesSeleccionados []string) map[string]string {
	resultado := make(map[string]string)
	
	if len(tradesSeleccionados) == 0 {
		resultado["termino"] = "empleo trabajo"
		resultado["categoria"] = "general"
		return resultado
	}

	grafo := NuevoGrafoOficios()

	if len(tradesSeleccionados) == 1 {
		if nodo, existe := grafo.Nodos[tradesSeleccionados[0]]; existe {
			resultado["termino"] = nodo.TerminoBusqueda
			resultado["categoria"] = nodo.Categoria
			return resultado
		}
		resultado["termino"] = "empleo trabajo"
		resultado["categoria"] = "general"
		return resultado
	}

	var mejorCombinacion *CombinacionOficios
	mejorPrioridad := -1

	for i := range grafo.Combinaciones {
		comb := &grafo.Combinaciones[i]
		if contieneSubconjunto(tradesSeleccionados, comb.Oficios) {
			prioridadEfectiva := comb.Prioridad + (len(comb.Oficios) * 10)
			if prioridadEfectiva > mejorPrioridad {
				mejorPrioridad = prioridadEfectiva
				mejorCombinacion = comb
			}
		}
	}

	conteoCategoria := make(map[string]int)
	for _, trade := range tradesSeleccionados {
		if nodo, existe := grafo.Nodos[trade]; existe {
			conteoCategoria[nodo.Categoria]++
		}
	}

	categoriaDominante := "general"
	maxConteo := 0
	for cat, conteo := range conteoCategoria {
		if conteo > maxConteo {
			maxConteo = conteo
			categoriaDominante = cat
		}
	}

	if mejorCombinacion != nil {
		resultado["termino"] = mejorCombinacion.TerminoResultado
		resultado["categoria"] = categoriaDominante
		return resultado
	}

	puntuaciones := make(map[string]int)

	for _, trade := range tradesSeleccionados {
		nodo, existe := grafo.Nodos[trade]
		if !existe {
			continue
		}

		if nodo.Categoria == categoriaDominante {
			puntuaciones[trade] = 15
		} else {
			puntuaciones[trade] = 10
		}

		for _, otroTrade := range tradesSeleccionados {
			if trade == otroTrade {
				continue
			}
			if peso, conectado := nodo.Conexiones[otroTrade]; conectado {
				puntuaciones[trade] += peso
			}
		}
	}

	mejorTrade := ""
	mejorPuntuacion := -1

	for trade, puntuacion := range puntuaciones {
		if puntuacion > mejorPuntuacion {
			mejorPuntuacion = puntuacion
			mejorTrade = trade
		}
	}

	if nodo, existe := grafo.Nodos[mejorTrade]; existe {
		resultado["termino"] = nodo.TerminoBusqueda
		resultado["categoria"] = nodo.Categoria
		return resultado
	}

	resultado["termino"] = "empleo trabajo"
	resultado["categoria"] = "general"
	return resultado
}


func ObtenerTrayectorias(tradesSeleccionados []string) []string {
	if len(tradesSeleccionados) == 0 {
		return []string{}
	}

	grafo := NuevoGrafoOficios()
	trayectoriasMap := make(map[string]bool)

	for _, trade := range tradesSeleccionados {
		if nodo, existe := grafo.Nodos[trade]; existe {
			for _, trayectoria := range nodo.Trayectorias {
				trayectoriasMap[trayectoria] = true
			}
		}
	}

	// Convertir mapa a slice
	trayectorias := make([]string, 0, len(trayectoriasMap))
	for t := range trayectoriasMap {
		trayectorias = append(trayectorias, t)
	}

	// Ordenar alfabéticamente
	sort.Strings(trayectorias)

	return trayectorias
}

func ObtenerInfoCompleta(tradesSeleccionados []string) map[string]interface{} {
	resultado := make(map[string]interface{})

	terminoInfo := ObtenerTerminoBusquedaConCategoria(tradesSeleccionados)
	trayectorias := ObtenerTrayectorias(tradesSeleccionados)

	resultado["termino_busqueda"] = terminoInfo["termino"]
	resultado["categoria"] = terminoInfo["categoria"]
	resultado["trayectorias"] = trayectorias
	resultado["oficios_seleccionados"] = tradesSeleccionados

	grafo := NuevoGrafoOficios()
	terminosAlternativos := make([]string, 0)
	
	for _, trade := range tradesSeleccionados {
		if nodo, existe := grafo.Nodos[trade]; existe {
			if !strings.Contains(terminoInfo["termino"], nodo.TerminoBusqueda) {
				terminosAlternativos = append(terminosAlternativos, nodo.TerminoBusqueda)
			}
		}
	}
	resultado["terminos_alternativos"] = terminosAlternativos

	return resultado
}

func ObtenerTodosLosTerminos() map[string]string {
	grafo := NuevoGrafoOficios()
	terminos := make(map[string]string)
	
	for nombre, nodo := range grafo.Nodos {
		terminos[nombre] = nodo.TerminoBusqueda
	}
	
	return terminos
}
