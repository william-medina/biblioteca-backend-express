import multer from 'multer';
import path from 'path';

// Configuración de Multer para almacenamiento temporal
const storage = multer.memoryStorage(); // Usar memoria para almacenamiento temporal

export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // Limita el tamaño del archivo a 5MB
    },
    fileFilter: (req, file, cb) => {
        // Permitir solo archivos .jpg
        const allowedExtensions = /\.jpg$/i;
        const mimetype = file.mimetype === 'image/jpeg'; // Asegura que el tipo MIME sea 'image/jpeg'
        const extname = allowedExtensions.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('El archivo debe ser una imagen válida con extensión .jpg.'));
    }
}).single('cover'); // 'cover' es el nombre del campo de archivo en el formulario

// Middleware para manejar errores de multer
export const handleMulterErrors = (err: any, req: any, res: any, next: any) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'La imagen no debe superar los 5MB.' });
        }
    } else if (err) {
        return res.status(400).json({ error: err.message });
    }
    next();
};