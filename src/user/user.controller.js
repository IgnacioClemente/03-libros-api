import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "./user.service.js";

export const getAllUsersController = async (req,res) =>{
    try{
        const users = await getAllUsers();
        res.status(200).json(users);
    }catch (error){
        res.status(500).json({ msg: 'Error al obtener los usuarios' });
    }
};

export const getUserByIdController = async (req,res) =>{
    try{
        const id = parseInt(req.params.id);
        const user = await getUserById(id);
    if(!user){
        return res.status(404).json({ msg: 'No se encontro al usuario ingresado' });
    }
    res.status(200).json(user);
    }catch (error){
        res.status(500).json({error: 'Error al obtener el usuario'});
    }
};

export const createUserController = async (req,res) => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({error: 'Error al crear usuario'});
    }
};

export const updateUserController = async (req,res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await updateUser(id,req.body);
        if (!existUser(id)) {
			return res.status(404).json({ msg: 'Usuario no encontrado' });
		}

        if(!user){
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Error al actualizar el usuario' });
    }
};

export const deleteUserController = async (req,res) =>{
    try {
        const id = parseInt(req.params.id);
        const userCheck = await deleteUser(id);

        if (!userCheck) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
		res.status(200).json({ msg: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(204).json({error: 'Error al borrar el usuario'});
    }
};

export const existUser = async (id) => {
    try{
        const existUser = await prisma.user.findUnique({
            where: {id, deletedAt: null}
        });

        if(!existUser){
            return false;
        }
        return true;
    }catch(error){
        return false;
    }
};