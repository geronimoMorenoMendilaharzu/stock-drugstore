window.onload = inicio
let var_id


function inicio() {
    document.getElementById("btnAgregar").addEventListener("click", agregar);
    document.getElementById("btnModificar").addEventListener("click", modificar);
    document.getElementById("btnBuscar").addEventListener("click", buscar);

    cargardatos();
    listar();
    ocultarBoton2();

    //funciones categorias
    document.getElementById("btnListarCategorias").addEventListener("click", listarCategorias);
    document.getElementById("btnAgregarCat").addEventListener("click", agregarCat);
    document.getElementById("btnModificarCat").addEventListener("click", modificarCateg);
    ocultarBotonModCategoria();

    //funciones caja
    document.getElementById("btnAgregarMovimiento").addEventListener("click", agregarMovCaja);
    document.getElementById("btnModificarMov").addEventListener("click", modificarMov);

    listarCaja();
    ocultarBotonModCaja();

}

async function listar() {
    try {
        let articulos = await axios.get("http://localhost:3000/articulo")
        for (item of articulos.data)
        {
            document.getElementById("tbody").innerHTML += `
                <td> ${item.descripcion}</td> 
                <td> ${item.marca}</td> 
                <td> $${item.precio}</td>
                <td> ${item.stock}</td>
                <td>${item.categoriaId}</td>  
                <td><button id="btnMod" onclick="mod('${item.id}','${item.descripcion}','${item.marca}','${item.precio}','${item.stock}','${item.categoriaId}')">✏️</button></td> 
                <td><button id ="btnBorrar" onclick="borrar('${item.id}')">🗑️</button></td>`
        }
    } catch (error) {
        console.log(error.request.status)
    }
}

async function buscar(){

    try {
        let arti = await axios.get("http://localhost:3000/articulo?descripcion=" + document.getElementById("buscar").value)
        for (item of arti.data)
        {
            document.getElementById("tbBuscar").innerHTML += `
                <td> ${item.descripcion}</td> 
                <td> ${item.marca}</td> 
                <td> $${item.precio}</td>
                <td> ${item.stock}</td>
                <td>${item.categoriaId}</td>`
        }
    } catch (error) {
        console.log(error.request.status)
    }
}

async function agregar() {
    try {
        let res = await axios.post("http://localhost:3000/articulo", {
            descripcion: document.getElementById("descripcion").value,
            marca: document.getElementById("marca").value,
            precio: document.getElementById("precio").value,
            stock: document.getElementById("stock").value,
            categoriaId: document.getElementById("categorias").value
        })
        alert("articulo guardado")



    } catch (error) {
        console.log(error.request.status)
    }
}

async function cargardatos() {
    try {
        let categ = await axios.get("http://localhost:3000/categoria")
        let opt = ""
        for (item of categ.data) {
            opt += `<option id=${item.id}>${item.categoria}</option>`
        }
    document.getElementById("categorias").innerHTML += opt
    } catch (error) {
        console.log(error)
    }
    
}

function ocultarBoton(){
    document.getElementById('btnAgregar').style.display = 'none';
}
function ocultarBoton2(){
    document.getElementById('btnModificar').style.display = 'none';
}
function mostrarBoton(){
    document.getElementById('btnModificar').style.display = 'inline-block';
}

function mod(id, descripcion, marca, precio, stock, categoria) {
    document.getElementById("descripcion").value = descripcion,
    document.getElementById("marca").value = marca,
    document.getElementById("precio").value = precio,
    document.getElementById("stock").value = stock,
    document.getElementById("categorias").value = categoria,
    var_id = id
    ocultarBoton();
    mostrarBoton();
}

async function modificar() {
    try {
        let res = await axios.put("http://localhost:3000/articulo/" + var_id, {
            descripcion: document.getElementById("descripcion").value,
            marca: document.getElementById("marca").value,
            precio: document.getElementById("precio").value,
            stock: document.getElementById("stock").value,
            categoriaId: document.getElementById("categorias").value
        })
        alert("dato modificado correctamente")
        
    } catch (err) {
        console.log(err)
    }
}

async function borrar(id) {
    try {
        let res = await axios.delete("http://localhost:3000/articulo/"+id)
        alert("dato borrado correctamente")
    } catch (error) {
        (err => console.log(error))
    }


}


// CATEGORIAS
function listarCategorias(){
    axios({
        method:'GET',
        url:'http://localhost:3000/categoria'
    })
    .then((result) => {
        for (item of result.data)
        {
            document.getElementById("tbodyCategorias").innerHTML += `
                <td> ${item.categoria}</td> 
                <td><button id="btnModCat" onclick="modCat('${item.id}','${item.categoria}')">✏️</button></td> 
                <td><button id="btnborrarCat" onclick="borrarCat('${item.id}')">🗑️</button></td>`
        }
    }).catch((err) => {
        console.log(error.request.status)
    });
}


/*
async function listarCategorias() {
    try {
        let categoria = await axios.get("http://localhost:3000/categoria")
        for (item of categoria.data)
        {
            document.getElementById("tbodyCategorias").innerHTML += `
                <td> ${item.categoria}</td> 
                <td><button id="btnModCat" onclick="modCat('${item.id}','${item.categoria}')">✏️</button></td> 
                <td><button id="btnborrarCat" onclick="borrarCat('${item.id}')">🗑️</button></td>`
        }
    } catch (error) {
        console.log(error.request.status)
    }
}
*/
async function agregarCat() {
    try {
        let res = await axios.post("http://localhost:3000/categoria", {
            categoria: document.getElementById("agregarCateg").value
        })
        alert("categoria guardada")
    } catch (error) {
        console.log(error.request.status)
    }
}
async function borrarCat(id){
    try {
        let res = await axios.delete("http://localhost:3000/categoria/"+id)
    } catch (error) {
        (err => console.log(error))
    }
}
function modCat(id, categoria) {
    document.getElementById("agregarCateg").value = categoria,
    var_id = id

    ocultarBotonAgregarCateg();
    mostrarBotonModCat();
}
async function modificarCateg() {
    try {
        let res = await axios.put("http://localhost:3000/categoria/" + var_id, {
            categoria: document.getElementById("agregarCateg").value
        })
        alert("dato modificado correctamente")
    } catch (err) {
        console.log(err)
    }
}
function ocultarBotonAgregarCateg(){
    document.getElementById('btnAgregarCat').style.display = 'none';
}
function ocultarBotonModCategoria(){
    document.getElementById('btnModificarCat').style.display = 'none';
}
function mostrarBotonModCat(){
    document.getElementById('btnModificarCat').style.display = 'inline-block';
}
// CAJA

async function listarCaja() {
    try {
        let caja = await axios.get("http://localhost:3000/caja")
        for (item of caja.data)
        {
            document.getElementById("tbVerCaja").innerHTML += `
                <td> $${item.monto}</td>
                <td> ${item.motivo}</td>
                <td> ${item.descripcionMov}</td>
                <td><button id="btnModCaja" onclick="modMovimiento('${item.id}','${item.monto}','${item.motivo}','${item.descripcionMov}')">✏️</button></td>
                <td><button id= "btnBorrarCaja" onclick="borrarMov('${item.id}')">🗑️</button></td>`
        }
    } catch (error) {
        console.log(error.request.status)
    }
}

async function agregarMovCaja() {
    try {
        let res = await axios.post("http://localhost:3000/caja", {
            monto: document.getElementById("monto").value,
            motivo: document.getElementById("motivo").value,
            descripcionMov: document.getElementById("descripcionMov").value
        })
        alert("movimiento guardado")
    } catch (error) {
        console.log(error.request.status)
    }
}
async function borrarMov(id){
    try {
        let res = await axios.delete("http://localhost:3000/caja/"+id)
    } catch (error) {
        (err => console.log(error))
    }
}
function modMovimiento(id, monto, motivo, descripcionMov) {
    document.getElementById("monto").value = monto,
    document.getElementById("motivo").value = motivo,
    document.getElementById("descripcionMov").value = descripcionMov,
    var_id = id

    ocultarBotonAgregarCaja();
    mostrarBotonModCaja();
}
async function modificarMov() {
    try {
        let res = await axios.put("http://localhost:3000/caja/" + var_id, {
            monto: document.getElementById("monto").value,
            motivo: document.getElementById("motivo").value,
            descripcionMov: document.getElementById("descripcionMov").value
        })
        alert("dato modificado correctamente")
    } catch (err) {
        console.log(err)
    }
}
function ocultarBotonAgregarCaja(){
    document.getElementById('btnAgregarMovimiento').style.display = 'none';
}
function ocultarBotonModCaja(){
    document.getElementById('btnModificarMov').style.display = 'none';
}
function mostrarBotonModCaja(){
    document.getElementById('btnModificarMov').style.display = 'inline-block';
}