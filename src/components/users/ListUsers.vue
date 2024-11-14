<template>
    <div>
        <div v-if="errors" class="error-message">
        {{ errors }}
        </div>

        <input class="form-control" v-model="nameFilter" placeholder="Buscar por nombre" />

        <ag-grid-vue
            :gridOptions="gridOptions"
            :columnDefs="columnDefs"
            :rowData="filteredUsers"
            :domLayout="'autoHeight'"
            style="width: 100%; min-height: 65vh;"
            :pagination="true"
            :paginationPageSize="10"
            :class="((theme === 'dark') ? 'ag-theme-alpine-dark' : 'ag-theme-alpine')"
            @grid-ready="onGridReady"
        ></ag-grid-vue>

    </div>

</template>

<script>
import { ref, onMounted, computed } from 'vue';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { AgGridVue } from 'ag-grid-vue3';
import { getUsers } from '../../services/api';
import { useTheme } from '../../composables/useTheme';

export default {
    components: {
        AgGridVue,
    },
    setup() {        
        const { theme } = useTheme();

        const nameFilter = ref('');
        const users       = ref([]);
        const isLoading  = ref(true);
        const errors     = ref(null);
        const isModalVisible = ref(false);
        const selectedRowData = ref(null);

        const renderPhoto = (params) => {
            
            return params.value
                ? `<img src="${params.value}" style="width: 50px; height: 50px;">`
                : `<span @click=${alert()}>Sin Foto</span>`;
        };

        const openCamera = (params) => {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                        
                        const videoElement = document.createElement('video');
                        videoElement.srcObject = stream;
                        videoElement.play();

                        const container = document.createElement('div');
                        const captureButton = document.createElement('button');
                        captureButton.innerText = 'Tomar Foto';
                        captureButton.classList.add('btn', 'btn-success', 'btn-sm');

                        captureButton.addEventListener('click', () => {
                            const canvas = document.createElement('canvas');
                            const context = canvas.getContext('2d');
                            canvas.width = videoElement.videoWidth;
                            canvas.height = videoElement.videoHeight;
                            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

                            const photoData = canvas.toDataURL('image/png');

                            params.node.setDataValue('photo', photoData);

                            stream.getTracks().forEach(track => track.stop());
                            container.remove();
                        });

                        container.appendChild(videoElement);
                        container.appendChild(captureButton);

                        document.body.appendChild(container);
                    })
                    .catch((error) => {
                        console.error("Error al acceder a la cámara:", error);
                    });
            } 
            else {
                alert("La cámara no está soportada en este navegador.");
            }
        }

        const deleteRow = (params) => {

            const rowNode = params.node;
            
            const indexToRemove = rowNode.rowIndex;
            users.value.splice(indexToRemove, 1);
        }

        const actionCellRenderer = (params) => {
            
            const container = document.createElement('div');
            container.classList.add('action-buttons');

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
            deleteButton.innerHTML = '<i class="bi bi-trash"></i>';
            deleteButton.addEventListener('click', function () {
                deleteRow(params);
            });

            const photoButton = document.createElement('button');
            photoButton.classList.add('btn', 'btn-primary', 'btn-sm');
            photoButton.innerHTML = '<i class="bi bi-camera"></i>';
            photoButton.addEventListener('click', () => {
                openCamera(params);
            });
            

            container.appendChild(photoButton);
            container.appendChild(deleteButton);
            return container;
        }

        const columnDefs = [
            { headerName: 'Foto', field: 'photo', cellRenderer: renderPhoto },
            { headerName: "Nombre", field: "name" },
            { headerName: "Apellidos", field: "lastname" },
            { headerName: "Correo electrónico", field: "email" },
            { headerName: "Teléfono", field: "phone" },
            {
                headerName: "Acciones",
                cellRenderer: actionCellRenderer,
                colId: 'actions',
                width: 150
            },
        ];

        const gridOptions = {
            pagination: true,
            paginationPageSize: 10,
            defaultColDef: {
                sortable: true,
                filter: false,
                resizable: true,
            },
        };

        const fetchUsers = async () => {
            isLoading.value = true;
            errors.value    = null;

            try {
                const data = await getUsers(50);
                users.value = data;
            } 
            catch (error) {
                errors.value = 'Error al cargar los datos, por favor intente más tarde.';
                console.error('Error al obtener los registros:', error);
            } 
            finally {
                isLoading.value = false;
            }
        };

        onMounted(() => {
            fetchUsers();
        });

        const filteredUsers = computed(() => {
            
            const filtered = users.value.filter((user) =>
                user.name.toLowerCase().includes(nameFilter.value.toLowerCase())
            );

            return filtered;
        });

        const onGridReady = (params) => {
            params.api.sizeColumnsToFit();
        };

        return {
            columnDefs,
            filteredUsers,
            gridOptions,
            nameFilter,
            isLoading,
            errors,
            theme,
            renderPhoto,
            onGridReady,
            isModalVisible,
            selectedRowData,
            deleteRow,
            actionCellRenderer,
            openCamera
        };
    },
};
</script>

<style>

.ag-theme-alpine {
    background-color: #f4f4f4;
}

.ag-theme-alpine-dark {
    background-color: #333;
}

.pagination-controls {
    margin-top: 20px;
    display: flex;
    align-items: center;
}

.fade-out {
    transition: opacity 0.3s ease-out;
    opacity: 0;
}
</style>