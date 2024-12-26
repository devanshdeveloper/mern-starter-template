import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router";
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Card, CardBody, Input, Button } from '@nextui-org/react';
import { Mail, Lock } from 'lucide-react';
import { setCredentials } from '../../store/slices/authSlice';

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
}).required();

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    // Simulate login - Replace with actual API call
    dispatch(setCredentials({
      user: {
        id: '1',
        name: 'John Doe',
        email: data.email,
        role: 'admin',
      },
      token: 'dummy-token'
    }));
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>Login | E-Commerce Admin</title>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardBody className="space-y-6 p-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Welcome Back</h1>
              <p className="text-gray-500 mt-2">Sign in to your account</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  {...register('email')}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  startContent={<Mail className="w-4 h-4 text-gray-400" />}
                  errorMessage={errors.email?.message}
                  isInvalid={!!errors.email}
                />
              </div>

              <div>
                <Input
                  {...register('password')}
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  startContent={<Lock className="w-4 h-4 text-gray-400" />}
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot password?
                </a>
              </div>

              <Button type="submit" color="primary" className="w-full">
                Sign In
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default Login;