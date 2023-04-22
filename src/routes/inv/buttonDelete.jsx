import {useState} from 'react'

const buttonDelete = ({ inventario, handleDeleteType, docId }) => {
    const [deleteType, setDeleteType] = useState(false);

    function handleShowButtonDelete() {
      setDeleteType(true);
    }
  
    function handleNoDelete() {
      setDeleteType(false);
    }
    return (
      <div style={{ display: "inline" }}>
        {!deleteType ? (
          <button onClick={handleShowButtonDelete}>Delete</button>
        ) : (
          <div>
            Estas seguro??
            <button
              onClick={() => {
                handleDeleteType(inventario.docId, inventario.inventario);
              }}
            >
              Si
            </button>
            <button onClick={handleNoDelete}>No</button>
          </div>
        )}
      </div>
    );
}


export default buttonDelete;