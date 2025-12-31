const cursosData = {
  // CICLO 1
  mat1: [],
  alg: [],
  ima: [],
  ivu: [],
  ing1: [],
  crt1: [],

  // CICLO 2
  mat2: ["mat1"],
  matd: ["mat1"],
  pdpa: ["ima", "crt1"],
  edp: ["mat1"],
  tic: ["ivu"],
  ing2: ["ing1"],
  crt2: ["crt1"],

  // CICLO 3
  cal1: ["mat2"],
  mecc: ["mat2"],
  esin: ["edp"],
  tprog: ["alg", "tic"],
  ing3: ["ing2"],
  cre: ["ima", "crt1"],
  
  // CICLO 4
  cal2: ["cal1"],
  elec: ["mecc", "cal1"],
  ada: ["tprog", "matd"],
  poo: ["tprog"],
  bd1: ["tprog"],
  ing4: ["ing3"],
  inac: ["ima"],
  
  // CICLO 5
  dpat: ["bd1", "poo"],
  bd2: ["bd1"],
  rcd1: ["poo"],
  siop: ["bd1"],
  aed: ["poo", "ada"],
  tpw: ["bd1"],
  hitd: [],
  
  // CICLO 6
  jsa: ["tpw"],
  heca: ["tpw"],
  mdw: ["tpw"],
  adsi: ["aed"],
  gp: ["hitd"],
  c1ss: ["aed"],
  aoe: [],
  
  // CICLO 7
  sein: ["rcd1"],
  dwi: ["jsa", "mdw", "heca"],
  hede: ["jsa", "mdw", "heca"],
  tesi: ["aed", "tic"],
  lep: ["aed"],
  dps: ["aoe"],
  lge: ["aoe"],
  
  // CICLO 8
  hep: ["dps"],
  gsti: ["adsi"],
  nen: ["aoe"],
  itd: ["adsi"],
  hce: ["c1ss"],
  diae: ["adsi"],
  inne: ["bd2", "hede"],
  
  // CICLO 9
  ihm: ["adsi", "dps"],
  geco: ["inne"],
  tics: ["diae"],
  sie: ["adsi", "aoe"],
  c2s: ["diae", "inne", "c1ss"],
  fis: ["c1ss", "crt2", "inac"],

  // CICLO 10
  sec: ["rcd1"],
  ntt: ["itd"],
  inec: ["sie"],
  fpe: ["hce"],
  etp: ["fis"],
  tis: ["fis"],
  deso: ["adsi"],
  ebe: ["ing4"]
};

const cursos = document.querySelectorAll(".curso");
const ciclos = document.querySelectorAll(".ciclo");

let aprobados = JSON.parse(localStorage.getItem("aprobados")) || [];
let dark = localStorage.getItem("dark") === "true";

if (dark) document.body.classList.add("dark");

document.getElementById("modoBtn").onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", document.body.classList.contains("dark"));
};

cursos.forEach(curso => {
  const id = curso.dataset.id;
  if (aprobados.includes(id)) curso.classList.add("aprobado");
});

actualizarTodo();

cursos.forEach(curso => {
  curso.onclick = () => {
    if (curso.classList.contains("bloqueado")) return;
    const id = curso.dataset.id;
    if (!aprobados.includes(id)) {
      aprobados.push(id);
      localStorage.setItem("aprobados", JSON.stringify(aprobados));
      curso.classList.add("aprobado");
      actualizarTodo();
    }
  };
});

function actualizarTodo() {
  cursos.forEach(curso => {
    const id = curso.dataset.id;
    const req = cursosData[id];
    const habilitado = req.every(r => aprobados.includes(r));

    if (habilitado && curso.classList.contains("bloqueado")) {
      curso.classList.remove("bloqueado");
      curso.classList.add("desbloqueado");
    }

    if (!aprobados.includes(id)) {
      curso.classList.toggle("bloqueado", !habilitado);
    }
  });

  ciclos.forEach(ciclo => {
    const cursosCiclo = ciclo.querySelectorAll(".curso");
    const aprobadosCiclo = [...cursosCiclo].filter(c => c.classList.contains("aprobado"));
    const porcentaje = Math.round((aprobadosCiclo.length / cursosCiclo.length) * 100);
    ciclo.querySelector(".avance").textContent = `Avance: ${porcentaje}%`;
  });
}
