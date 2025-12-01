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
		// ========== COMBINACIONES TÉCNICAS ==========
		{[]string{"electrician", "mechanics"}, "técnico electromecánico industrial", 100},
		{[]string{"electrician", "welding"}, "técnico electricista industrial", 95},
		{[]string{"electrician", "plumbing"}, "técnico instalaciones eléctricas sanitarias", 90},
		{[]string{"mechanics", "welding"}, "técnico mecánico soldador industrial", 100},
		{[]string{"mechanics", "plumbing"}, "técnico mecánico instalaciones", 85},
		{[]string{"plumbing", "welding"}, "técnico instalador soldador", 85},
		{[]string{"electrician", "mechanics", "welding"}, "técnico mantenimiento industrial", 150},
		{[]string{"mechanics", "electrician", "plumbing"}, "técnico mantenimiento general", 130},

		// ========== COMBINACIONES CONSTRUCCIÓN ==========
		{[]string{"carpentry", "masonry"}, "maestro constructor acabados", 95},
		{[]string{"carpentry", "welding"}, "carpintero metálico estructuras", 90},
		{[]string{"carpentry", "plumbing"}, "instalador acabados sanitarios", 80},
		{[]string{"carpentry", "electrician"}, "instalador acabados eléctricos", 80},
		{[]string{"carpentry", "mechanics"}, "técnico fabricación muebles maquinaria", 70},
		{[]string{"masonry", "plumbing"}, "maestro obra instalaciones", 90},
		{[]string{"masonry", "welding"}, "técnico construcción estructuras", 85},
		{[]string{"masonry", "electrician"}, "maestro obra instalaciones eléctricas", 85},
		{[]string{"masonry", "mechanics"}, "operador maquinaria construcción", 75},
		{[]string{"carpentry", "masonry", "plumbing"}, "maestro constructor integral", 140},
		{[]string{"carpentry", "masonry", "welding"}, "maestro constructor estructuras metálicas", 135},

		// ========== COMBINACIONES SERVICIOS ==========
		{[]string{"cooking", "cleaning"}, "auxiliar cocina limpieza", 80},
		{[]string{"cooking", "care"}, "auxiliar nutrición cuidado personas", 85},
		{[]string{"cooking", "hairdressing"}, "técnico servicios personales", 65},
		{[]string{"cooking", "gardening"}, "auxiliar servicios hotelería", 60},
		{[]string{"cooking", "security"}, "personal cocina seguridad alimentaria", 55},
		{[]string{"cleaning", "care"}, "asistente cuidado mantenimiento hogar", 90},
		{[]string{"cleaning", "gardening"}, "mantenimiento áreas verdes limpieza", 85},
		{[]string{"cleaning", "security"}, "personal mantenimiento seguridad", 75},
		{[]string{"cleaning", "hairdressing"}, "auxiliar limpieza estética", 65},
		{[]string{"care", "hairdressing"}, "técnico cosmetología cuidado personal", 80},
		{[]string{"care", "gardening"}, "asistente áreas verdes cuidado", 60},
		{[]string{"care", "security"}, "asistente seguridad cuidado personas", 65},
		{[]string{"gardening", "security"}, "vigilante mantenimiento áreas verdes", 70},
		{[]string{"gardening", "hairdressing"}, "técnico estética natural spa", 55},
		{[]string{"security", "hairdressing"}, "personal seguridad establecimientos", 50},
		{[]string{"cleaning", "gardening", "security"}, "personal mantenimiento integral", 120},
		{[]string{"cooking", "cleaning", "care"}, "auxiliar servicios generales hogar", 115},

		// ========== COMBINACIONES COMERCIALES ==========
		{[]string{"sales", "logistics"}, "operador comercial logística ventas", 90},
		{[]string{"sales", "care"}, "asesor ventas atención cliente", 80},
		{[]string{"sales", "security"}, "asesor ventas seguridad", 70},
		{[]string{"sales", "cleaning"}, "promotor productos limpieza", 65},
		{[]string{"sales", "cooking"}, "asesor gastronomía alimentos", 70},
		{[]string{"sales", "hairdressing"}, "asesor productos belleza cosméticos", 75},
		{[]string{"sales", "gardening"}, "asesor productos jardinería vivero", 70},
		{[]string{"logistics", "security"}, "operador almacén seguridad", 85},
		{[]string{"logistics", "cleaning"}, "operador logística mantenimiento", 75},
		{[]string{"logistics", "care"}, "coordinador logística servicios salud", 70},
		{[]string{"sales", "logistics", "security"}, "coordinador operaciones comerciales", 125},

		// ========== COMBINACIONES TÉCNICO + CONSTRUCCIÓN ==========
		{[]string{"electrician", "masonry"}, "técnico instalaciones eléctricas obra", 85},
		{[]string{"electrician", "carpentry"}, "instalador sistemas eléctricos acabados", 80},
		{[]string{"mechanics", "masonry"}, "operador maquinaria construcción pesada", 80},
		{[]string{"mechanics", "carpentry"}, "técnico maquinaria carpintería", 75},
		{[]string{"plumbing", "carpentry"}, "instalador sanitarios acabados", 80},
		{[]string{"welding", "masonry"}, "técnico estructuras metálicas construcción", 85},
		{[]string{"welding", "carpentry"}, "fabricante estructuras metálicas madera", 80},

		// ========== COMBINACIONES TÉCNICO + SERVICIOS ==========
		{[]string{"electrician", "cooking"}, "técnico equipos cocina industrial", 60},
		{[]string{"electrician", "cleaning"}, "técnico equipos limpieza industrial", 60},
		{[]string{"electrician", "care"}, "técnico equipos médicos asistenciales", 60},
		{[]string{"electrician", "hairdressing"}, "técnico equipos estética salón", 55},
		{[]string{"electrician", "gardening"}, "técnico sistemas riego eléctrico", 65},
		{[]string{"electrician", "security"}, "técnico sistemas seguridad electrónica", 85},
		{[]string{"mechanics", "cooking"}, "técnico maquinaria alimentos", 60},
		{[]string{"mechanics", "cleaning"}, "operador maquinaria limpieza industrial", 60},
		{[]string{"mechanics", "care"}, "técnico equipos movilidad asistida", 55},
		{[]string{"mechanics", "hairdressing"}, "técnico equipos salón belleza", 50},
		{[]string{"mechanics", "gardening"}, "operador maquinaria jardinería", 70},
		{[]string{"mechanics", "security"}, "técnico sistemas seguridad vehicular", 70},
		{[]string{"plumbing", "cooking"}, "técnico instalaciones cocina", 65},
		{[]string{"plumbing", "cleaning"}, "técnico instalaciones sanitarias", 70},
		{[]string{"plumbing", "care"}, "técnico instalaciones centros salud", 60},
		{[]string{"plumbing", "hairdressing"}, "técnico instalaciones salón spa", 55},
		{[]string{"plumbing", "gardening"}, "técnico instalaciones riego", 80},
		{[]string{"plumbing", "security"}, "técnico instalaciones seguridad hídrica", 55},
		{[]string{"welding", "cooking"}, "técnico fabricación equipos cocina", 55},
		{[]string{"welding", "cleaning"}, "fabricante equipos limpieza metálicos", 50},
		{[]string{"welding", "care"}, "fabricante equipos médicos metálicos", 50},
		{[]string{"welding", "hairdressing"}, "fabricante mobiliario metálico salón", 45},
		{[]string{"welding", "gardening"}, "fabricante estructuras invernaderos", 60},
		{[]string{"welding", "security"}, "fabricante estructuras seguridad", 65},

		// ========== COMBINACIONES CONSTRUCCIÓN + SERVICIOS ==========
		{[]string{"carpentry", "cooking"}, "fabricante mobiliario restaurantes", 55},
		{[]string{"carpentry", "cleaning"}, "instalador acabados mantenimiento", 60},
		{[]string{"carpentry", "care"}, "fabricante mobiliario centros salud", 55},
		{[]string{"carpentry", "hairdressing"}, "fabricante mobiliario salones belleza", 55},
		{[]string{"carpentry", "gardening"}, "fabricante mobiliario exterior jardines", 65},
		{[]string{"carpentry", "security"}, "instalador puertas seguridad", 60},
		{[]string{"masonry", "cooking"}, "constructor cocinas industriales", 55},
		{[]string{"masonry", "cleaning"}, "albañil mantenimiento edificios", 65},
		{[]string{"masonry", "care"}, "constructor centros salud", 55},
		{[]string{"masonry", "hairdressing"}, "constructor locales comerciales", 50},
		{[]string{"masonry", "gardening"}, "constructor paisajismo exteriores", 70},
		{[]string{"masonry", "security"}, "constructor instalaciones seguridad", 60},

		// ========== COMBINACIONES TÉCNICO + COMERCIAL ==========
		{[]string{"electrician", "sales"}, "asesor técnico productos eléctricos", 75},
		{[]string{"electrician", "logistics"}, "técnico logística equipos eléctricos", 70},
		{[]string{"mechanics", "sales"}, "asesor técnico automotriz repuestos", 80},
		{[]string{"mechanics", "logistics"}, "operador maquinaria montacargas", 85},
		{[]string{"plumbing", "sales"}, "asesor técnico productos sanitarios", 70},
		{[]string{"plumbing", "logistics"}, "operador logística materiales construcción", 65},
		{[]string{"welding", "sales"}, "asesor técnico productos metalúrgicos", 65},
		{[]string{"welding", "logistics"}, "operador logística estructuras metálicas", 60},

		// ========== COMBINACIONES CONSTRUCCIÓN + COMERCIAL ==========
		{[]string{"carpentry", "sales"}, "vendedor muebles carpintería", 70},
		{[]string{"carpentry", "logistics"}, "operador logística muebles", 65},
		{[]string{"masonry", "sales"}, "asesor materiales construcción", 65},
		{[]string{"masonry", "logistics"}, "operador logística materiales obra", 70},
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
