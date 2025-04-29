document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    const tabla = document.getElementById('tablaRegistros').querySelector('tbody');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        limpiarErrores();

        const cedula = document.getElementById('cedula').value.trim();
        const nombres = document.getElementById('nombres').value.trim();
        const apellidos = document.getElementById('apellidos').value.trim();
        const departamento = document.getElementById('departamento').value;
        const motivo = document.getElementById('motivo').value.trim();

        let isValid = true;

        // Validar campos obligatorios
        if (!cedula) {
            mostrarError('errorCedula', 'La cédula es obligatoria');
            isValid = false;
        } else if (!validarCedula(cedula)) {
            mostrarError('errorCedula', 'Formato inválido (Ej: 001-123456-7890A)');
            isValid = false;
        }

        if (!nombres) {
            mostrarError('errorNombres', 'Los nombres son obligatorios');
            isValid = false;
        }

        if (!apellidos) {
            mostrarError('errorApellidos', 'Los apellidos son obligatorios');
            isValid = false;
        }

        if (!departamento) {
            mostrarError('errorDepartamento', 'Seleccione un departamento');
            isValid = false;
        }

        if (!motivo) {
            mostrarError('errorMotivo', 'El motivo es obligatorio');
            isValid = false;
        }

        if (isValid) {
            agregarRegistroATabla(cedula, nombres, apellidos, departamento, motivo);
            form.reset();
        }
    });

    // Función para validar cédula
    function validarCedula(cedula) {
        const regex = /^\d{3}-\d{6}-\d{4}[A-Za-z]$/;
        return regex.test(cedula) && cedula.length === 16;
    }

    // Mostrar mensajes de error
    function mostrarError(id, mensaje) {
        const errorSpan = document.getElementById(id);
        errorSpan.textContent = mensaje;
        errorSpan.style.display = 'block';
    }

    // Limpiar errores
    function limpiarErrores() {
        document.querySelectorAll('.error-msg').forEach(span => {
            span.style.display = 'none';
        });
    }

    // Agregar fila a la tabla
    function agregarRegistroATabla(cedula, nombres, apellidos, departamento, motivo) {
        const fila = tabla.insertRow();
        fila.innerHTML = `
            <td>${cedula}</td>
            <td>${nombres}</td>
            <td>${apellidos}</td>
            <td>${departamento}</td>
            <td>${motivo}</td>
        `;
    }
});