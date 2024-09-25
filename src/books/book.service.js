import prisma from "../../prisma/prismaClient.js";

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
    include: { author: { select: { firstName: true, lastName: true } } }
});
    return book
}

export const createBook = async (book) => {
	const { title, year, publisher, authorID } = book;

	const create_book = await prisma.book.create({
		data: {
			title,
			year,
			publisher,
			authorID
		}
	});

	return create_book;
};


export const updateBook = async (id,title) =>{
        const bookUpdate = await prisma.book.update({
            where: {id}, 
            data:  {title},
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