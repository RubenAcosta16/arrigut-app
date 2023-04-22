import { useState, useRef, useEffect } from "react";

const productoDb = ({ docId, name, producto,precio, onDelete, onUpdate }) => {
    
  const [currentName, setCurrentName] = useState(name);
  const [currentProducto, setCurrentProducto] = useState(producto);
  const [currentPrecio, setCurrentPrecio] = useState(precio);

  const [editName, setEditName] = useState(false);
  const [editProducto, setEditProducto] = useState(false);
  const [editPrecio, setEditPrecio] = useState(false);

  const refName = useRef(null);
  const refVerb = useRef(null);
  const refPrecio = useRef(null);

  function handleEditName() {
    setEditName(true);
  }

  function handleEditVerb() {
    setEditProducto(true);
  }

  function handleEditPrecio() {
    setEditPrecio(true);
  }
  
  async function handleDelete() {
    await onDelete(docId);
  }

  function handleOnBlurName(e) {
    setEditName(false);
    // ejemplo
    onUpdate(docId, e.target.value, currentProducto,currentPrecio);
  }

  function handleOnBlurVerb(e) {
    setEditProducto(false);
    onUpdate(docId, currentName, e.target.value,currentPrecio);
  }

  function handleOnBlurPrecio(e) {
    setEditPrecio(false);
    onUpdate(docId, currentName,currentProducto, e.target.value);
  }

  useEffect(() => {
    if (refName.current) {
      refName.current.focus();
    }
  }, [editName]);

  useEffect(() => {
    if (refVerb.current) {
      refVerb.current.focus();
    }
  }, [editProducto]);
  
  useEffect(() => {
    if (refPrecio.current) {
      refPrecio.current.focus();
    }
  }, [editPrecio]);


  function handleOnChangeName(e) {
    setCurrentName(e.target.value);
  }

  function handleOnChangeVerb(e) {
    setCurrentProducto(e.target.value);
  }
  
  function handleOnChangePrecio(e) {
    setCurrentPrecio(e.target.value);
  }


  return (
    <div key={docId}>
      <p></p>
      <div>
        {editName ? (
          <>
            <input
              ref={refName}
              onBlur={handleOnBlurName}
              onChange={handleOnChangeName}
              value={currentName}
            />
          </>
        ) : (
          <>
            <button onClick={handleEditName}>Edit</button>
            Nombre: {currentName}
          </>
        )}
      </div>

      <div>
        {editProducto ? (
          <>
            <input
              ref={refVerb}
              onBlur={handleOnBlurVerb}
              onChange={handleOnChangeVerb}
              value={currentProducto}
            />
          </>
        ) : (
          <>
            <button onClick={handleEditVerb}>Edit</button>
            Cantidad: {currentProducto}
          </>
        )}
      </div>
            
      <div>
        {editPrecio ? (
          <>
            <input
              ref={refPrecio}
              onBlur={handleOnBlurPrecio}
              onChange={handleOnChangePrecio}
              value={currentPrecio}
            />
          </>
        ) : (
          <>
            <button onClick={handleEditPrecio}>Edit</button>
            Precio: {currentPrecio}
          </>
        )}
      </div>     

      <div>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}

export default productoDb;