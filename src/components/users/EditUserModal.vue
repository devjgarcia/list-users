<template>
    <div class="modal fade" tabindex="-1" :class="{ show: isVisible }" style="display: block" aria-labelledby="exampleModalLabel" aria-hidden="!isVisible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Datos</h5>
            <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="saveData">
              <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" id="nombre" v-model="editedData.name" />
              </div>
              <div class="mb-3">
                <label for="edad" class="form-label">Apellidos</label>
                <input type="number" class="form-control" id="edad" v-model="editedData.lastname" />
              </div>
              <div class="mb-3">
                <label for="photo" class="form-label">Foto</label>
                <input type="file" class="form-control" id="photo" @change="handleFileChange" />
                <button type="button" class="btn btn-secondary mt-2" @click="capturePhoto">Tomar foto</button>
                <div v-if="photo">
                  <img :src="photo" alt="Foto" class="img-thumbnail mt-2" />
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Guardar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['isVisible', 'data'],
    data() {
      return {
        editedData: { ...this.data },
        photo: this.data.photo || null  // Si ya tiene foto, cargarla.
      };
    },
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false);
      },
      saveData() {
        // Emitir la foto junto con los demás datos al componente padre
        this.$emit('update:data', { ...this.editedData, foto: this.photo });
        this.closeModal();
      },
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.photo = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      },
      capturePhoto() {
        // Usamos la API de la cámara para capturar la foto
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            const video = document.createElement('video');
            video.srcObject = stream;
            video.play();
            video.onloadedmetadata = () => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              context.drawImage(video, 0, 0, canvas.width, canvas.height);
              const photoDataUrl = canvas.toDataURL();
              this.photo = photoDataUrl;
              stream.getTracks().forEach(track => track.stop()); // Detener la cámara
            };
          })
          .catch((error) => {
            console.error('Error al acceder a la cámara:', error);
          });
      }
    }
  };
  </script>