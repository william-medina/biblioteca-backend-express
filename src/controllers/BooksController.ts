import { Request, Response } from 'express';
import { Op, Order } from 'sequelize';
import Book from '../models/Book';
import path from 'path';
import fs from 'fs';

type BookWithNumber = {
    id: number;
    isbn: bigint;
    title: string;
    author: string;
    publisher: string;
    publication_year: string;
    location: string;
    number: number;
}


export class BooksController {

    // Obtener la cantidad total de libros
    static getBookCount = async (req: Request, res: Response) => {
        try {
            const count = await Book.count();
            res.json({ count });
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve book count.' });
        }
    };

    // Obtener una cantidad específica de libros de forma aleatoria
    static getRandomBooks = async (req: Request, res: Response) => {
        try {
            const { count } = req.params;
            const numberOfBooks = parseInt(count, 10);

            if (isNaN(numberOfBooks) || numberOfBooks <= 0) {
                return res.status(400).json({ error: 'Invalid count parameter.' });
            }

            // Obtener el total de libros
            const totalBooks = await Book.count();

            if (totalBooks === 0) {
                return res.status(404).json({ error: 'No books available.' });
            }

            // Obtener los libros aleatorios
            const randomBooks = await Book.findAll({
                order: Book.sequelize.random(),
                limit: numberOfBooks
            });

            res.json(randomBooks);
        } catch (error) {
            console.error('Error fetching random books:', error);
            res.status(500).json({ error: 'Failed to retrieve books.' });
        }
    };

    // Obtener todos los libros, opcionalmente ordenados por un campo específico
    static getAllBooks = async (req: Request, res: Response) => {
        try {
            const { sortBy } = req.params;
    
            // Definir campos de ordenación válidos
            const validSortFields = ['title', 'author', 'publisher', 'publication_year', 'id'];
            const orderField = validSortFields.includes(sortBy) ? sortBy : 'title';
    
            // Definir el orden basado en el campo
            let order: Order = [];
    
            if (orderField === 'author') {
                order = [
                    [Book.sequelize.literal(`CASE WHEN author LIKE '%S.A' THEN 1 ELSE 0 END`), 'ASC'],
                    [orderField, 'ASC']
                ];
            } else if (orderField === 'publisher') {
                order = [
                    [Book.sequelize.literal(`CASE WHEN publisher LIKE '%S.E' THEN 1 ELSE 0 END`), 'ASC'],
                    [orderField, 'ASC']
                ];
            } else if (orderField === 'publication_year') {
                order = [
                    [Book.sequelize.literal(`CASE WHEN publication_year LIKE '%S.F' THEN 1 ELSE 0 END`), 'ASC'],
                    [orderField, 'DESC']
                ];
            } else if (orderField === 'id') {
                order = [[orderField, 'DESC']];
            } else {
                order = [[orderField, 'ASC']];
            }
    
            const books = await Book.findAll({
                order: order
            });
    
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve books.' });
        }
    };

    // Buscar libros por una palabra clave en el título, autor o editorial
    static getBooksByKeyword = async (req: Request, res: Response) => {
        try {
            const { keyword } = req.params;
    
            // Si el keyword es una cadena vacía, no aplicar filtros y devolver todos los libros
            const books = keyword.trim() === ''
                ? await Book.findAll({
                    order: [['title', 'ASC']]
                })
                : await Book.findAll({
                    where: {
                        [Op.or]: [
                            { isbn: { [Op.eq]: keyword } },
                            { title: { [Op.like]: `%${keyword}%` } },
                            { author: { [Op.like]: `%${keyword}%` } },
                            { publisher: { [Op.like]: `%${keyword}%` } },
                            { publication_year: { [Op.eq]: keyword } },
                            { location: { [Op.like]: `%${keyword}%` } }
                        ]
                    },
                    order: [['title', 'ASC']]
                });
    
            res.json(books);
        } catch (error) {
            res.status(500).json({ error: 'Failed to search books.' });
        }
    };

    static getBookByISBN = async (req: Request, res: Response) => {
        try {
            const { isbn } = req.params;
    
            if (!isbn) {
                return res.status(400).json({ error: 'ISBN parameter is required.' });
            }
    
            const book = await Book.findOne({ where: { isbn } });
    
            if (!book) {
                return res.status(404).json({ error: 'Book not found.' });
            }
    
            res.json(book);
        } catch (error) {
            console.error('Error retrieving book:', error);
            res.status(500).json({ error: 'Failed to retrieve book.' });
        }
    };

    // Agregar un nuevo libro
    static addNewBook = async (req: Request, res: Response) => {
        try {
            // Obtener los datos del cuerpo de la solicitud
            let { title, author, publisher, publication_year, isbn, location } = req.body;
            
            // Aplicar trim a los campos
            title = title.trim();
            author = author.trim();
            publisher = publisher.trim();
            publication_year = publication_year.trim();
            location = location.trim();
            isbn = isbn.trim();

            // Verificar si el ISBN ya existe
            const existingBook = await Book.findOne({ where: { isbn } });
            if (existingBook) {
                return res.status(400).json({ error: 'El libro con ese ISBN ya existe' });
            }

            // Verificar si la ubicación ya existe
            const existingLocation = await Book.findOne({ where: { location } });
            if (existingLocation) {
                return res.status(400).json({ error: 'Un libro ya tiene esa ubicación' });
            }

            // Reemplazar los valores vacíos con valores predeterminados
            author = author === '' ? 'S.A' : author.toUpperCase();
            publisher = publisher === '' ? 'S.E' : publisher.toUpperCase();
            publication_year = publication_year === '' ? 'S.F' : publication_year.toUpperCase();
            location = location === '' ? '---' : location.toUpperCase();

            // Crear el nuevo libro
            await Book.create({
                isbn,
                title: title.toUpperCase(),
                author,
                publisher,
                publication_year,
                location
            });

            // Guardar la imagen solo después de que los datos del libro se hayan guardado correctamente
            if (req.file) {
                const coverPath = path.join(__dirname, '../../uploads/covers/', `${isbn}${path.extname(req.file.originalname)}`);
                fs.writeFileSync(coverPath, req.file.buffer); 
            }

            res.status(201).json('Libro almacenado correctamente');
        } catch (error) {
            console.error('Error adding new book:', error);
            res.status(500).json({ error: 'Failed to add new book.' });
        }
    };

    static updateBook = async (req: Request, res: Response) => {
        try {
            const { bookIsbn } = req.params;
            const { title, author, publisher, publication_year, location, isbn } = req.body;

            // Buscar el libro por su ISBN
            const book = await Book.findOne({ where: { isbn: bookIsbn } });

            if (!book) {
                return res.status(404).json({ error: 'Libro no encontrado.' });
            }

            // Verificar si la nueva ubicación ya existe
            if (location) {
                const existingLocation = await Book.findOne({ where: { location } });
                if (existingLocation && existingLocation.id !== book.id) {
                    return res.status(400).json({ error: 'Un libro ya tiene esa ubicación.' });
                }
            }

            // Verificar si el nuevo ISBN ya existe
            if (isbn && isbn !== book.isbn.toString()) {
                const existingBook = await Book.findOne({ where: { isbn } });
                if (existingBook) {
                    return res.status(400).json({ error: 'Un libro con ese ISBN ya existe.' });
                }
            }

            // Actualizar el libro con los nuevos datos
            await book.update({
                title: title?.trim().toUpperCase(),
                author: author?.trim() === '' ? 'S.A' : author.trim().toUpperCase(),
                publisher: publisher?.trim() === '' ? 'S.E' : publisher.trim().toUpperCase(),
                publication_year: publication_year?.trim() === '' ? 'S.F' : publication_year.trim().toUpperCase(),
                location: location?.trim() === '' ? '---' : location.trim().toUpperCase(),
                isbn: isbn
            });

            // Guardar la imagen solo después de que los datos del libro se hayan actualizado correctamente
            if (req.file) {
                const coverPath = path.join(__dirname, '../../uploads/covers/', `${isbn}${path.extname(req.file.originalname)}`);
                fs.writeFileSync(coverPath, req.file.buffer); // Guardar la imagen en el sistema de archivos
            }

            res.status(201).json('Libro actualizado correctamente');
        } catch (error) {
            console.error('Error updating book:', error);
            res.status(500).json({ error: 'Failed to update book book.' });
        }
    };

    static deleteBook = async (req: Request, res: Response) => {
        try {
            const { bookIsbn } = req.params;
    
            // Buscar el libro por su ISBN
            const book = await Book.findOne({ where: { isbn: bookIsbn } });
            if (!book) {
                return res.status(404).json({ error: 'Libro no encontrado.' });
            }
    
            // Buscar y eliminar la portada del libro
            const coverDir = path.join(__dirname, '../../uploads/covers');
            const coverFiles = fs.readdirSync(coverDir);
            const coverFile = coverFiles.find(file => file.startsWith(`${book.isbn}.`));
    
            if (coverFile) {
                const coverPath = path.join(coverDir, coverFile);
                fs.unlinkSync(coverPath); // Elimina el archivo de la portada
            }
    
            // Eliminar el libro de la base de datos
            await book.destroy();
    
            res.status(200).json({ message: 'Libro eliminado.' });
        } catch (error) {
            console.error('Error deleting book:', error);
            res.status(500).json({ error: 'Failed to delete book.' });
        }
    };

    static getLocationBooks = async (req: Request, res: Response) => {
        try {
            // Obtener todos los libros
            const books = await Book.findAll();
    
            // Inicializar el array resultante para las estanterías
            const locationBooks: { shelf: string; sections: { section: string; books: BookWithNumber[] }[] }[] = [];
    
            books.forEach((book) => {
                const [shelf, position] = book.location.split('-');
                const section = position.charAt(0);
                const number = parseInt(position.substring(1));

                // Si no tienen posición ignorar
                if(shelf === '') {
                    return;
                }
    
                // Buscar si la estantería ya existe en el array
                let shelfGroup = locationBooks.find((item) => item.shelf === shelf);
    
                if (!shelfGroup) {
                    // Si no existe, creamos una nueva estantería
                    shelfGroup = { shelf, sections: [] };
                    locationBooks.push(shelfGroup);
                }
    
                // Buscar si la sección ya existe dentro de la estantería
                let sectionGroup = shelfGroup.sections.find((item) => item.section === section);
    
                if (!sectionGroup) {
                    // Si no existe, creamos una nueva sección
                    sectionGroup = { section, books: [] };
                    shelfGroup.sections.push(sectionGroup);
                }
    
                    // Crear un libro con el atributo `number` y agregarlo a la sección correspondiente
                    const bookWithNumber: BookWithNumber = {
                        id: book.id,
                        isbn: book.isbn,
                        title: book.title,
                        author: book.author,
                        publisher: book.publisher,
                        publication_year: book.publication_year,
                        location: book.location,
                        number: number, // Añade el número de la posición
                    };

                    sectionGroup.books.push(bookWithNumber);
            });
    
            // Ordenar las estanterías, secciones y libros
            locationBooks.sort((a, b) => a.shelf.localeCompare(b.shelf));
    
            locationBooks.forEach((shelfGroup) => {
                // Ordenar las secciones dentro de cada estantería
                shelfGroup.sections.sort((a, b) => a.section.localeCompare(b.section));
    
                shelfGroup.sections.forEach((sectionGroup) => {
                    // Ordenar los libros dentro de cada sección por número de posición
                    sectionGroup.books.sort((a, b) => a.number - b.number);
                });
            });
    
            res.json(locationBooks);
        } catch (error) {
            console.error('Error fetching location books:', error);
            res.status(500).json({ error: 'Failed to retrieve location books.' });
        }
    };
}