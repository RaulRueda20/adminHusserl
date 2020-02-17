const getObject = (name) => {
      if(localStorage.getItem(name))
          return atob(localStorage.getItem(name))
      else return false
    }

const setObject = (name, object) => {
      localStorage.setItem(name, btoa(object))
    }

const getObjects = (name) => {
      if(localStorage.getItem(name))
          return JSON.parse(atob(localStorage.getItem(name)))
      else return false
  }

const setObjects = (name, objects) => {
      localStorage.setItem(name, btoa(JSON.stringify(objects)))
  }

const getItem =(name) => {
      if(sessionStorage.getItem(name))
          return atob(sessionStorage.getItem(name))
      else return false
  }

const setItem = (name, object) => {
     sessionStorage.setItem(name, btoa(object))
  }

export {getObject, setObject, getObjects, setObjects, getItem, setItem};
