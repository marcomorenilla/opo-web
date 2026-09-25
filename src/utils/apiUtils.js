const CONSTITUCION_ESTRUCTURA = {
  preambulo: { inicio: null, fin: null },
  tituloPreliminar: { inicio: 1, fin: 9 },
  tituloI: {
    nombre: "De los derechos y deberes fundamentales",
    inicio: 10,
    fin: 55,
    capitulos: {
      capituloPrimero: {
        nombre: "De los españoles y los extranjeros",
        inicio: 11,
        fin: 13,
      },
      capituloSegundo: {
        nombre: "Derechos y libertades",
        inicio: 14,
        fin: 38,
        secciones: {
          seccionPrimera: {
            nombre:
              "De los derechos fundamentales y de las libertades públicas",
            inicio: 15,
            fin: 29,
          },
          seccionSegunda: {
            nombre: "De los derechos y deberes de los ciudadanos",
            inicio: 30,
            fin: 38,
          },
        },
      },
      capituloTercero: {
        nombre: "De los principios rectores de la política social y económica",
        inicio: 39,
        fin: 52,
      },
      capituloCuarto: {
        nombre: "De la garantía de las libertades y derechos fundamentales",
        inicio: 53,
        fin: 54,
      },
      capituloQuinto: {
        nombre: "De la suspensión de los derechos y libertades",
        inicio: 55,
        fin: 55,
      },
    },
  },
  tituloII: { nombre: "De la Corona", inicio: 56, fin: 65 },
  tituloIII: {
    nombre: "De las Cortes Generales",
    inicio: 66,
    fin: 96,
    capitulos: {
      capituloPrimero: { nombre: "De las Cámaras", inicio: 66, fin: 80 },
      capituloSegundo: {
        nombre: "De la elaboración de las leyes",
        inicio: 81,
        fin: 92,
      },
      capituloTercero: {
        nombre: "De los Tratados Internacionales",
        inicio: 93,
        fin: 96,
      },
    },
  },
  tituloIV: {
    nombre: "Del Gobierno y de la Administración",
    inicio: 97,
    fin: 107,
  },
  tituloV: {
    nombre: "De las relaciones entre el Gobierno y las Cortes Generales",
    inicio: 108,
    fin: 116,
  },
  tituloVI: { nombre: "Del Poder Judicial", inicio: 117, fin: 127 },
  tituloVII: { nombre: "Economía y Hacienda", inicio: 128, fin: 136 },
  tituloVIII: {
    nombre: "De la Organización Territorial del Estado",
    inicio: 137,
    fin: 158,
    capitulos: {
      capituloPrimero: {
        nombre: "Principios generales",
        inicio: 137,
        fin: 139,
      },
      capituloSegundo: {
        nombre: "De la Administración Local",
        inicio: 140,
        fin: 142,
      },
      capituloTercero: {
        nombre: "De las Comunidades Autónomas",
        inicio: 143,
        fin: 158,
      },
    },
  },
  tituloIX: { nombre: "Del Tribunal Constitucional", inicio: 159, fin: 165 },
  tituloX: { nombre: "De la Reforma Constitucional", inicio: 166, fin: 169 },
  disposiciones: {
    adicionales: { cantidad: 4 },
    transitorias: { cantidad: 9 },
    derogatoria: { cantidad: 1 },
    final: { cantidad: 1 },
  },
};

function numeroARomano(numero) {
  const valores = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let resultado = "";

  for (const [valor, simbolo] of valores) {
    while (numero >= valor) {
      resultado += simbolo;
      numero -= valor;
    }
  }

  return resultado;
}

/**
 * Devuelve la ubicación dentro de la Constitución según el número del artículo.
 */
export function obtenerEstructuraArticulo(numArticulo) {
  const num = parseInt(numArticulo, 10);

  if (isNaN(num) || num < 1 || num > 169) {
    return { titulo: null, capitulo: null, seccion: null };
  }

  for (const [key, t] of Object.entries(CONSTITUCION_ESTRUCTURA)) {
    if (t.inicio && num >= t.inicio && num <= t.fin) {
      const titulos = Object.keys(CONSTITUCION_ESTRUCTURA).filter((nombre) =>
        /^titulo[IVXLCDM]+$/.test(nombre),
      );
      let result = {
        titulo: t.nombre
          ? `Tit ${numeroARomano(titulos.indexOf(key) + 1)} - ${t.nombre}`
          : "TÍTULO PRELIMINAR",
        capitulo: null,
        seccion: null,
      };

      if (t.capitulos) {
        for (const [cKey, cap] of Object.entries(t.capitulos)) {
          if (num >= cap.inicio && num <= cap.fin) {
            result.capitulo = `Cap ${numeroARomano(
              Object.keys(t.capitulos).indexOf(cKey) + 1,
            )} - ${cap.nombre}`;

            if (cap.secciones) {
              for (const [sKey, sec] of Object.entries(cap.secciones)) {
                if (num >= sec.inicio && num <= sec.fin) {
                  result.seccion = `Sección ${numeroARomano(
                    Object.keys(cap.secciones).indexOf(sKey) + 1,
                  )} - ${sec.nombre}`;
                  break;
                }
              }
            }
            break;
          }
        }
      }

      return result;
    }
  }

  return { titulo: null, capitulo: null, seccion: null };
}
