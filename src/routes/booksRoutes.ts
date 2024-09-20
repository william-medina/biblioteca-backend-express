import { Router } from "express";
import { BooksController } from "../controllers/BooksController";
import { authenticate } from "../middleware/auth";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middleware/validation";
import { handleMulterErrors, upload } from "../middleware/multer";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Endpoints for managing books in the library.
 */

/**
 * @swagger
 * /books/count:
 *   get:
 *     summary: Get the total count of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Returns the total count of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                   example: 150
 *       500:
 *         description: Failed to retrieve book count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve book count'
 */
router.get('/count', BooksController.getBookCount);

/**
 * @swagger
 * /books/random/{count}:
 *   get:
 *     summary: Get a random set of books
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: count
 *         schema:
 *           type: integer
 *         required: true
 *         description: The number of random books to retrieve
 *     responses:
 *       200:
 *         description: Returns a random set of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 207
 *                   isbn:
 *                     type: number
 *                     example: '9505043651'
 *                   title:
 *                     type: string
 *                     example: 'APICULTURA PRÁCTICA'
 *                   author:
 *                     type: string
 *                     example: 'ALDO L. PERSANO'
 *                   publisher:
 *                     type: string
 *                     example: 'HEMISFERIO SUR'
 *                   publication_year:
 *                     type: string
 *                     example: '1992'
 *                   location:
 *                     type: string
 *                     example: 'E-G06'
 *       400:
 *         description: Invalid count value
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid count parameter'
 *       500:
 *         description: Failed to retrieve books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve books'
 */
router.get('/random/:count',
    param('count').isInt({ gt: 0 }).withMessage('El valor de count debe ser un número positivo'),
    handleInputErrors,
    BooksController.getRandomBooks
);

/**
 * @swagger
 * /books/location:
 *   get:
 *     summary: Get books by location
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: Returns books by location
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   shelf:
 *                     type: string
 *                     example: 'E'
 *                   sections:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         section:
 *                           type: string
 *                           example: 'G'
 *                         books:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               id:
 *                                 type: number
 *                                 example: 207
 *                               isbn:
 *                                 type: number
 *                                 example: '9505043651'
 *                               title:
 *                                 type: string
 *                                 example: 'APICULTURA PRÁCTICA'
 *                               author:
 *                                 type: string
 *                                 example: 'ALDO L. PERSANO'
 *                               publisher:
 *                                 type: string
 *                                 example: 'HEMISFERIO SUR'
 *                               publication_year:
 *                                 type: string
 *                                 example: '1992'
 *                               location:
 *                                 type: string
 *                                 example: 'E-G06'
 *       500:
 *         description: Failed to retrieve location books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve location books.'
 */
router.get('/location', BooksController.getLocationBooks);

/**
 * @swagger
 * /books/{sortBy}:
 *   get:
 *     summary: Get all books sorted by a specific field
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum: [title, author, publisher, publication_year, location]
 *         required: true
 *         description: The field by which to sort the books
 *     responses:
 *       200:
 *         description: Returns all books sorted by the specified field
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 207
 *                   isbn:
 *                     type: number
 *                     example: '9505043651'
 *                   title:
 *                     type: string
 *                     example: 'APICULTURA PRÁCTICA'
 *                   author:
 *                     type: string
 *                     example: 'ALDO L. PERSANO'
 *                   publisher:
 *                     type: string
 *                     example: 'HEMISFERIO SUR'
 *                   publication_year:
 *                     type: string
 *                     example: '1992'
 *                   location:
 *                     type: string
 *                     example: 'E-G06'
 *       400:
 *         description: Invalid sort field
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Campo de ordenación no válido.'
 *       500:
 *         description: Failed to retrieve books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve books'
 */
router.get('/:sortBy',
    handleInputErrors,
    BooksController.getAllBooks
);

/**
 * @swagger
 * /books/search/{keyword}:
 *   get:
 *     summary: Search books by keyword
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: The keyword to search for in book titles and authors
 *     responses:
 *       200:
 *         description: Returns a list of books that match the keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 207
 *                   isbn:
 *                     type: number
 *                     example: '9505043651'
 *                   title:
 *                     type: string
 *                     example: 'APICULTURA PRÁCTICA'
 *                   author:
 *                     type: string
 *                     example: 'ALDO L. PERSANO'
 *                   publisher:
 *                     type: string
 *                     example: 'HEMISFERIO SUR'
 *                   publication_year:
 *                     type: string
 *                     example: '1992'
 *                   location:
 *                     type: string
 *                     example: 'E-G06'
 *       500:
 *         description: Failed to search books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to search books'
 */
router.get('/search/:keyword',
    param('keyword').notEmpty().withMessage('El keyword es obligatorio'),
    handleInputErrors,
    BooksController.getBooksByKeyword
);


/**
 * @swagger
 * /books/isbn/{isbn}:
 *   get:
 *     summary: Get a book by ISBN
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         schema:
 *           type: string
 *         required: true
 *         description: The ISBN of the book to retrieve
 *     responses:
 *       200:
 *         description: Returns the book details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   example: 20
 *                 isbn:
 *                   type: number
 *                   example: '9505043651'
 *                 title:
 *                   type: string
 *                   example: 'APICULTURA PRÁCTICA'
 *                 author:
 *                   type: string
 *                   example: 'ALDO L. PERSANO'
 *                 publisher:
 *                   type: string
 *                   example: 'HEMISFERIO SUR'
 *                 publication_year:
 *                   type: string
 *                   example: '1992'
 *                 location:
 *                   type: string
 *                   example: 'E-G06'
 *       400:
 *         description: ISBN parameter is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'ISBN parameter is required.'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Book not found.'
 *       500:
 *         description: Failed to retrieve book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to retrieve book.'
 */
router.get('/isbn/:isbn', BooksController.getBookByISBN);

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - isbn
 *               - title
 *               - author
 *               - publisher
 *               - publication_year
 *               - location
 *               - cover
 *             properties:
 *               isbn:
 *                 type: number
 *                 example: 9780307474728
 *               title:
 *                 type: string
 *                 example: 'Cien años de soledad'
 *               author:
 *                 type: string
 *                 example: 'Gabriel García Márquez'
 *               publisher:
 *                 type: string
 *                 example: 'Editorial Sudamericana'
 *               publication_year:
 *                 type: string
 *                 example: '1967'
 *               location:
 *                 type: string
 *                 example: 'A-V10'
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: Cover image of the book (JPG format)
 *     responses:
 *       201:
 *         description: Book added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Libro almacenado correctamente'
 *       400:
 *         description: Invalid input or duplicate data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'El libro con ese ISBN ya existe'
 *       500:
 *         description: Failed to add new book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to add new book'
 */
router.post('/',
    authenticate,
    upload, 
    handleMulterErrors,
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('isbn').notEmpty().withMessage('El ISBN es obligatorio'),
    body('publication_year').optional().isLength({ max: 6 }).withMessage('El año de publicación no puede tener más de 6 caracteres'),
    body('location').optional().isLength({ max: 6 }).withMessage('La ubicación no puede tener más de 6 caracteres'),
    handleInputErrors,
    BooksController.addNewBook
);


/**
 * @swagger
 * /books/{isbn}:
 *   put:
 *     summary: Update a book's details
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: isbn
 *         schema:
 *           type: string
 *         required: true
 *         description: The ISBN of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               isbn:
 *                 type: number
 *                 example: 9780307474728
 *               title:
 *                 type: string
 *                 example: 'Cien años de soledad'
 *               author:
 *                 type: string
 *                 example: 'Gabriel García Márquez'
 *               publisher:
 *                 type: string
 *                 example: 'Editorial Sudamericana'
 *               publication_year:
 *                 type: string
 *                 example: '1967'
 *               location:
 *                 type: string
 *                 example: 'A-V11'
 *               cover:
 *                 type: string
 *                 format: binary
 *                 description: New cover image for the book (JPG format)
 *     responses:
 *       200:
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Libro actualizado correctamente'
 *       400:
 *         description: Invalid input or duplicate data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Un libro con ese ISBN ya existe.'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Libro no encontrado.'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to update book book.'
 */
router.put('/:bookIsbn',
    authenticate,
    upload, 
    handleMulterErrors,
    param('bookIsbn').notEmpty().withMessage('El ID es obligatorio'),
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('isbn').notEmpty().withMessage('El ISBN es obligatorio'),
    body('publication_year').optional().isLength({ max: 6 }).withMessage('El año de publicación no puede tener más de 6 caracteres'),
    body('location').optional().isLength({ max: 6 }).withMessage('La ubicación no puede tener más de 6 caracteres'),
    handleInputErrors,
    BooksController.updateBook
);

/**
 * @swagger
 * /books/{isbn}:
 *   delete:
 *     summary: Delete a book by ISBN
 *     tags: [Books]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: isbn
 *         schema:
 *           type: string
 *         required: true
 *         description: The ISBN of the book to delete
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Libro eliminado.'
 *       404:
 *         description: Book not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Libro no encontrado.'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Failed to delete book.'
 */
router.delete('/:bookIsbn', 
    authenticate,
    param('bookIsbn').notEmpty().withMessage('El ID es obligatorio'), 
    BooksController.deleteBook
);

export default router;