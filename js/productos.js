var { createApp } = Vue
  createApp({
    data() {
      return {
        productos:[],
        url:'https://devburgercac.pythonanywhere.com/productos',
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        // id:0,
        // nombre:"", 
        // imagen:"",
        // stock:0,
        // precio:0,
    };
    },
    methods: {
        fetchData(url) {
            fetch(url)
            .then(response => response.json())
                .then(data => {
                    this.productos = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        addToCart(item) {
            this[item + "Items"] += 1;
          },
          decreaseQuantity(item) {
            if (this[item + "Items"] > 0) {
              this[item + "Items"] -= 1;
            }
          },
          clearItem(item) {
            this[item + "Items"] = 0;
          },
          checkout() {
            console.log("¡Pagado!");
          },
          clearAll() {
            if (window.confirm("¿Estás seguro de que deseas limpiar todo?")) {
              this.cplusplusItems = 0;
              this.pythonItems = 0;
              this.javaItems = 0;
              this.rubyItems = 0;
              this.phpItems = 0;
              // Set the remaining variables to 0
              console.log("Vaciaste el carrito.");
            }
          },
        // eliminar(id) {
        //     const url = this.url+'/' + id;
        //     var options = {
        //         method: 'DELETE',
        //     }
        //     fetch(url, options)
        //         .then(res => res.text()) // or res.json()
        //         .then(res => {
		// 	 alert('Registro Eliminado')
        //             location.reload(); // recarga el json luego de eliminado el registro
        //         })
        // },
        // grabar(){
        //     let producto = {
        //         nombre:this.nombre,
        //         precio: this.precio,
        //         stock: this.stock,
        //         imagen:this.imagen
        //     }
        //     var options = {
        //         body:JSON.stringify(producto),
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         redirect: 'follow'
        //     }
        //     fetch(this.url, options)
        //         .then(function () {
        //             alert("Registro grabado")
        //             window.location.href = "./productos.html";  // recarga productos.html
        //         })
        //         .catch(err => {
        //             console.error(err);
        //             alert("Error al Grabar")  // puedo mostrar el error tambien
        //         })      
        // }
    },
    created() {
        this.fetchData(this.url);
    },
  }).mount('#app');