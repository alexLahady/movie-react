//Component
import Banner from '../banner';

//Services
import { login } from '../../services';

//types
import { DataUser } from '../../types/users';

//CSS
import '../../styles/login.scss';

//Framework MUI
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

//React
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router';
import { SubmitHandler, useForm } from 'react-hook-form';

function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<DataUser>({
    mode: 'onTouched',
  });

  //post
  const onSubmit: SubmitHandler<DataUser> = async (data) => {
    try {
      setIsLoading(true);
      setServerError(null);

      const response = await login(data);
      const result = await response.json();

      if (result.statusCode === 400) {
        // on garde pour class-validator
        if (Array.isArray(result.message)) {
          result.message.forEach((err: { property: keyof DataUser; textError: string }) => {
            setError(err.property, { type: 'server', message: err.textError });
          });
        } else {
          setServerError('Erreur sur les identifiant.');
        }
        return;
      }

      if (result.statusCode === 401) {
        // vrai erreur
        setServerError('Erreur lors de la connexion.');
        return;
      }

      if (result.statusCode === 200) {
        navigate('/', { replace: true });
      } else {
        setServerError('Erreur lors de la connexion.');
      }
    } catch (err) {
      console.error(err);
      setServerError('Une erreur est survenue. Réessaie plus tard.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <Banner />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={2} sx={{ width: '400px', ml: 4 }}>
          <TextField
            label="Email"
            variant="standard"
            type="email"
            placeholder="example@example.com"
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email must be valid' },
            })}
          />

          <TextField
            label="Password"
            variant="standard"
            type="password"
            placeholder="••••••••"
            error={!!errors.password}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 2, message: 'Password must be at least 2 characters' },
            })}
          />

          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? 'Connecting...' : 'Send request'}
          </Button>

          {serverError && <p style={{ color: 'red', fontSize: '0.9rem' }}>{serverError}</p>}
        </Stack>
      </form>
      <p>
        If you don&apos;t have an account, go to <Link to="/signup">signup</Link>
      </p>
    </div>
  );
}

export default Login;
