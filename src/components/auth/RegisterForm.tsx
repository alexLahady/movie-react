//Component
import Banner from '../banner';

//Services
import { createUser, login } from '../../services';

//types
import { DataUser, CreateData } from '../../types/users';

//CSS
import '../../styles/signup.scss';

//Framework MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

//React
import { useState } from 'react';
import { Link } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

function Signup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateData>({
    mode: 'onTouched',
  });
  //test useFrom

  const onSubmit: SubmitHandler<CreateData> = async (data) => {
    try {
      setIsLoading(true);
      setServerError(null);

      const response = await createUser(data);
      const result = await response.json();

      if (result.statusCode === 400) {
        if (Array.isArray(result.message)) {
          result.message.forEach((err: { property: keyof CreateData; textError: string }) => {
            setError(err.property, { type: 'server', message: err.textError });
          });
        } else {
          setServerError('Erreur lors de la création du compte.');
        }
        return;
      }

      // login automatique
      const loginData: DataUser = { email: data.email, password: data.password };
      const responseLogin = await login(loginData);
      const resultLogin = await responseLogin.json();

      if (resultLogin.statusCode === 200) {
        navigate('/', { replace: true });
      } else {
        setServerError('Erreur lors de la connexion après l’inscription.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Une erreur est survenue. Réessaie plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <Banner />
      <h2>Fill out the registration form</h2>
      <div className="signup">
        <form className="formulare" onSubmit={handleSubmit(onSubmit)}>
          <Stack direction="column" spacing={2} sx={{ width: 400, ml: 4 }}>
            <TextField
              label="Email"
              variant="standard"
              placeholder="example@example.com"
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email must be valid' },
              })}
            />

            <TextField
              label="Name"
              variant="standard"
              placeholder="Richard"
              error={!!errors.name}
              helperText={errors.name?.message}
              {...register('name', {
                required: 'Name is required',
                minLength: { value: 2, message: 'Name must be at least 2 characters' },
              })}
            />

            <TextField
              label="Password (min. 8 characters)"
              variant="standard"
              type="password"
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' },
              })}
            />

            <Button type="submit" variant="contained" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Send request'}
            </Button>

            {serverError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{serverError}</p>}
          </Stack>
        </form>
        <p className="text-login">
          if you have already created an account go to <Link to="/user">login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
