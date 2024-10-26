import prisma from "../../prisma/prismaClient.js";
import { getUserByEmail } from "../user/user.service.js";
import { createBookSchema, updateBookSchema } from "./book.validator.js";

export const getAllBooks = async () => {
    const books = await prisma.book.findMany({
    include: 
    { author: 
    { select: 
    { firstName: true, lastName: true } } }});
    
    return books;
}

export const getBook = async (id) => {
    const book = await prisma.book.findUniqueOrThrow({
    where:{id},
    include: { author: { select: { firstName: true, lastName: true } },
    user: { select: { email: true } }
    }
});
    return book
}

export const createBook = async (book) => {
	const { title, year, publisher, authorID } = book;
    const {error} = createBookSchema.validate(book, { abortEarly: false });
    if(error){
        throw new Error(error.message);
    }
    const user = await getUserByEmail(email);
    const create_book = await prisma.book.create({
		data: {
			title,
			year,
			publisher,
			authorID,
            userId: user.id
		}
	});

	return create_book;
};


export const updateBook = async (id,book) =>{
    const { title, year, publisher, authorID } = book;
    const { error } = updateBookSchema.validate(book,{ abortEarly: false });
    if (error) {
        const errors = error.details.map((e) => e.message);
        throw new Error(errors);
    }
        const bookUpdate = await prisma.book.update({
            where: {id}, 
            data:  {
                title,
                year,
                publisher
            },
            include: { author: { select: { firstName: true, lastName: true } } }
        });

        return bookUpdate;
}

export const deleteBook = async (id) => {
    const bookDelete = await prisma.book.delete({
        where:{id},
        include: { author: { select: { firstName: true, lastName: true } } }
    });

    return bookDelete;
}