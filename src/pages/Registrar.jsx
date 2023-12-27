import { Link } from 'react-router-dom'
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [alerta, setAlerta] = useState({});

	const emailCheck = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	const handleSubmit = async e => {
		e.preventDefault();

		const camposVacios = [nombre, email, password, repetirPassword].some(campo => campo === '');

		if (camposVacios) {
			setAlerta({ msg: 'Hay campos vacios', error: true })
			return;
		}

		if (!emailCheck.test(email)) {
			setAlerta({ msg: 'Email no valido', error: true })
			return;
		}

		if (password !== repetirPassword) {
			setAlerta({ msg: 'Los Password no son iguales', error: true })
			return;
		}

		if (password.length < 6) {
			setAlerta({ msg: 'El password es muy corto, agrega un minimo de 6 caracteres', error: true })
			return;
		}

		setAlerta({});

		// Crear el usuario en la API
		try {
			const { status } = await clienteAxios.post('/veterinarios', { nombre, email, password });

			if (status === 200) {
				setAlerta({ msg: 'Creado Correctamente, revisa tu email', error: false });
			}

		} catch (error) {
			setAlerta({ msg: error.response.data.msg, error: true})
		}
	}

	const { msg } = alerta;

	return (
		<>
			<div>
				<h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y Administra {''}<span className="text-black">tus Pacientes</span></h1>
			</div>

			<div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

				{msg && <Alerta alerta={alerta} />}

				<form onSubmit={handleSubmit}>
					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
						<input
							type="text"
							placeholder="Tu Nombre"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
							value={nombre}
							onChange={e => setNombre(e.target.value)}
						/>
					</div>

					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold">Email</label>
						<input
							type="email"
							placeholder="Email de Registro"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
					</div>

					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold">Passowrd</label>
						<input
							type="password"
							placeholder="Tu Password"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
							value={password}
							onChange={e => setPassword(e.target.value)}
						/>
					</div>

					<div className="my-5">
						<label
							className="uppercase text-gray-600 block text-xl font-bold">Repetir Password</label>
						<input
							type="password"
							placeholder="Repite tu Password"
							className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
							value={repetirPassword}
							onChange={e => setRepetirPassword(e.target.value)}
						/>
					</div>

					<input
						type="submit"
						value="Crear Cuenta"
						className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
					/>
				</form>

				<nav className='mt-10 lg:flex lg:justify-between'>
					<Link
						className='block text-center my-5 text-gray-500'
						to="/"
					>Ya tienes una cuenta? Inicia Sesion</Link>

					<Link
						className='block text-center my-5 text-gray-500'
						to="/olvide-password"
					>Olvide mi Password</Link>
				</nav>
			</div>
		</>
	)
}

export default Registrar 
