import { useRouter } from 'next/router';

const About: React.FC = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <div>
      <h1>About Page</h1>
      <p>Hello, {name}!</p>
    </div>
  );
};

export default About;