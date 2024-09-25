import prisma from "../../prisma/prismaClient.js";

export const getAuthors = async () => {
    const author = await prisma.author.findMany();
    return author;
}

export const getAuthor = async (id) => {
    const author = await prisma.author.findUniqueOrThrow({where:{id}})
    return author;
}

export const createAuthor = async (author) =>{
    const {firstName, lastName, nationality, dateOfBirth} = author;
    const author_Create = await prisma.author.create({
        data: {
        firstName,
        lastName,
        nationality,
        dateOfBirth: new Date(dateOfBirth)
    }});
    return author_Create;
}

export const updateAuthor = async (id, author) => {
    const {firstName, lastName, nationality,dateOfBirth} = author;
    const authorUpdate = await prisma.author.update({
        where: {id}, 
        data:  {
            ...(firstName && {firstName}),
            ...(lastName &&  {lastName}),
            ...(nationality && {nationality}),
            ...(dateOfBirth && {dateOfBirth: new Date(dateOfBirth)})
        }
    });
    return authorUpdate;
}

export const deleteAuthor = async (id) => {
    const authorDelete = await prisma.author.delete({where:{id}});
    return authorDelete;
}