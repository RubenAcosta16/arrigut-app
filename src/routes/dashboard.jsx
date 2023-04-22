import Navbar from "./navBar";

import { v4 as uuidv4 } from "uuid";

import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import AuthProvider from "./authProvider";
import ButtonDelete from './inv/buttonDelete'  
import ProductoDb from './inv/productoDb'

import {
  getLinks,
  insertProducto,
  deleteProducto,
  updateProducto,
} from "../firebase/firebase";

// console.log


// name = nombre
// producto = cantidad
// precio

const dashboard = () => {
  const [currentState, setCurrentState] = useState(0);
  // 3 recargar

  const [currentUser, setCurrentUser] = useState({});

  const [productos, setProductos] = useState([]);

  const [mainProductos, setMainProductos] = useState([]);

  const [currentInventarioProductos, setCurrentInventarioProductos] = useState([]);

  const [productosMode, setProductosMode] = useState("ninguno");


  const navigate = useNavigate();

  const refNombre = useRef(null);
  const refProducto = useRef(null);
  const refPrecio = useRef(null)
  const refType = useRef(null);

  const refCrearTipo = useRef(null);

  async function handleUserLoggedIn(user) {
    // navigate("/");
    setCurrentState(2);

    // console.log("sesion iniciada")
    // console.log(user)
    setCurrentUser(user);

    // para obtener tipos
    const inventarios = await getLinks("inventarios");

    // console.log(inventarios)

    setCurrentInventarioProductos(inventarios);

    // console.log(inventarios)

    // obtener verbos
    const verbsAll = await getLinks("productos");

    let arrMain = [];
    for (let i = 0; i < inventarios.length; i++) {
      // console.log(tmp)
      // const tmp = await getLinks(inventarios[i].inventario);

      const tmp = verbsAll.filter((producto) => producto.inventario == inventarios[i].inventario);

      const obj = {
        inventario: inventarios[i].inventario,
        productos: tmp,
      };
      arrMain[i] = obj;
      // ordena alfabeticamente
      ordenarAlf(arrMain[i].productos);
    }
    // console.log(arrMain);

    // console.log(arrMain)

    setMainProductos(arrMain);
    // console.log(arrMain)
    setProductos(arrMain[0].productos);
  }

  // console.log(mainProductos)

  function ordenarAlf(arr) {
    arr.sort(function (a, b) {
      if (b.name < a.name) {
        return 1;
      } else if (b.name > a.name) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  function handleUserNotLoggedIn() {
    navigate("/login");
  }

  // console.log(currentUser)

  if (currentState == 0) {
    return (
      <AuthProvider
        userLoggedIn={handleUserLoggedIn}
        userNotLoggedIn={handleUserNotLoggedIn}
      >
        Loading...
      </AuthProvider>
    );
  }

  async function handleType(inventario) {
    let tmp = await mainProductos.filter((productos) => productos.inventario == inventario);

    // console.log(mainProductos);
    // console.log(tmp);

    setProductosMode(inventario);
    // console.log(tmp)
    // console.log(mainProductos)
    // console.log(currentInventarioProductos)

    setProductos([...tmp[0].productos]);
  }

  // enviar verbo
  function handleSubmit(e) {
    e.preventDefault();
    const nombre = e.target["nombre"].value;
    const producto = e.target["producto"].value;
    const precio = e.target["precio"].value;

    if (nombre !== "" || producto !== "") {
      const newDocId = uuidv4();

      const newProducto = {
        name: nombre,
        producto: producto,
        precio:precio,
        docId: newDocId,
        inventario: productosMode,
      };

      try {
        insertProducto(newProducto, "productos", newDocId);

        console.log("se envio el verbo");

        refNombre.current.value = "";
        refProducto.current.value = "";
        refPrecio.current.value = "";

        for (let i = 0; i < mainProductos.length; i++) {
          if (mainProductos[i].inventario == productosMode) {
            // console.log(mainProductos[i])
            mainProductos[i].productos.push(newProducto);
            ordenarAlf(mainProductos[i].productos);
            setProductos([...mainProductos[i].productos]);
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No pueden haber campos vacios", "e");
    }
  }

  async function remove(docId) {
    await deleteProducto(docId, "productos");
    // await deleteProducto(docId, productosMode);

    for (let i = 0; i < mainProductos.length; i++) {
      if (mainProductos[i].inventario == productosMode) {
        const tmp = mainProductos[i].productos.filter((producto) => producto.docId !== docId);
        mainProductos[i].productos = tmp;
        // console.log(mainProductos[i].productos)
        setProductos([...mainProductos[i].productos]);
      }
    }
    // }
  }

  async function handleUpdateProducto(docId, name, producto,precio) {
    const newProducto = productos.find((producto) => producto.docId === docId);
    newProducto.name = name;
    newProducto.producto = producto;
    newProducto.precio = precio;

    // console.log(newProducto);

    // aqui el error, se ejecuta infinitas veces
    await updateProducto(docId, newProducto, "productos");
  }

  // console.log(productos[0]?.name)
  // productos?.map((producto) =>{
  //   console.log(producto.name)
  // })

  function handleCrearTipo(e) {
    e.preventDefault();

    const tipo = e.target["inventario"].value;
    // console.log(tipo);

    if (tipo !== "") {
      const newDocId = uuidv4();

      const newType = {
        inventario: tipo,
        docId: newDocId,
      };
      // console.log(currentInventarioProductos);

      const newMainProducto = {
        inventario: tipo,
        productos: [{ name: "Sin verbos aun", producto: "", docId: newDocId }],
      };

      try {
        // para crear tipo
        insertProducto(newType, "inventarios", newDocId);

        console.log("se creo el tipo");
        // console.log(newType);

        refCrearTipo.current.value = "";

        setCurrentInventarioProductos([...currentInventarioProductos, newType]);

        // setMainProductos([...mainProductos, newMainProducto]);
        setMainProductos([...mainProductos, newMainProducto]);

        // console.log(mainProductos);

        // setProductosMode()

        // for (let i = 0; i < currentInventarioProductos.length; i++) {
        //   if (currentInventarioProductos[i].inventario == productosMode) {
        //     // console.log(mainProductos[i])
        //     mainProductos[i].productos.push(newProducto);
        //     ordenarAlf(mainProductos[i].productos);
        //     setProductos([...mainProductos[i].productos]);
        //   }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No pueden haber campos vacios", "e");
    }
  }
  // console.log(mainProductos);

  if (currentState == 3) {
    navigate("/dashboard");
  }

  async function handleDeleteType(docId, inventario) {
    await deleteProducto(docId, "inventarios");

    // console.log(currentInventarioProductos)

    const tmp = currentInventarioProductos.filter(
      (typeProducto) => typeProducto.docId !== docId
    );

    // console.log(tmp)

    setCurrentInventarioProductos([...tmp]);

    for (let i = 0; i < mainProductos.length; i++) {
      if (mainProductos[i].inventario == inventario) {
        // await deleteProducto(mainProductos[i].docId, "productos");
        // console.log(mainProductos[i].productos)
        for (let i2 = 0; i2 < mainProductos[i].productos.length; i2++) {
          // console.log(mainProductos[i].productos[i2].docId);
          await deleteProducto(mainProductos[i].productos[i2].docId, "productos");
        }
      }
    }

    // for (let i = 0; i < currentInventarioProductos.length; i++) {
    //   if (currentInventarioProductos[i].inventario == inventario) {
    //     const tmp = mainProductos[i].productos.filter((producto) => producto.docId == docId);
    //     // currentInventarioProductos[i].productos = tmp;
    //     // console.log(mainProductos[i].productos)
    //     console.log(tmp)
    //     setCurrentInventarioProductos([...tmp]);
    //     // setCurrentInventarioProductos(tmp)
    //   }
    // }

    // setCurrentInventarioProductos([...currentInventarioProductos, newType]);

    // setMainProductos([...mainProductos, newMainProducto]);
  }

  // console.log(productos)

  return (
    <Navbar>
        <Link to="/">Pagina principal</Link>
      <div>
        <div>Inventarios</div>

        <form action="" onSubmit={handleCrearTipo}>
          <label htmlFor="">Nombre:</label>
          <input ref={refCrearTipo} name="inventario" inventario="text" />
          <button inventario="submit">Crear</button>
        </form>
        <br />
        <br />
      </div>

      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Nombre</label>
        <input ref={refNombre} inventario="text" name="nombre" />

        <label htmlFor="">Cantidad</label>
        <input ref={refProducto} inventario="number" name="producto" />

        <label htmlFor="">Precio:</label>
        <input ref={refPrecio} inventario="number" name="precio" />

        <button inventario="submit">Enviar</button>
      </form>
      <div>
        <nav>
          Inventario seleccionado: {productosMode}
          {currentInventarioProductos.map((inventario) => (
            <div key={inventario.docId}>
              <button
                onClick={() => {
                  handleType(inventario.inventario);
                }}
              >
                {inventario.inventario}
              </button>
              <ButtonDelete
                inventario={inventario}
                handleDeleteType={handleDeleteType}
              ></ButtonDelete>
            </div>
          ))}
        </nav>

        {productos?.map((producto) => (
          <ProductoDb
            key={producto.docId}
            name={producto.name}
            producto={producto.producto}
            precio={producto.precio}
            docId={producto.docId}
            onDelete={remove}
            onUpdate={handleUpdateProducto}
          ></ProductoDb>
        ))}
      </div>
    </Navbar>
  );
};

export default dashboard;
