
const { Router } = require('express');
const { check } = require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();


const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

router.get('/getUser', usuariosGet );

router.put('/putUser:id',[
    check('id', 'Not its a valid ID').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut );

router.post('/putUser',[
    check('nombre', 'The name is required').not().isEmpty(),
    check('password', 'The password have to be more than 6 letters').isLength({ min: 6 }),
    check('correo', 'The email is not valid').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.delete('/deleteUser:id',[
    check('id', 'Not its a valid ID').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],usuariosDelete );

//router.patch('/', usuariosPatch );





module.exports = router;
