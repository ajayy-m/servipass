const Logo = ({ variant = 'default' }) => {
  const serviColor = variant === 'default' ? 'text-blue-700' : 'text-blue-400';
  const passColor = variant === 'default' ? 'text-red-600' : 'text-red-400';

  return (
    <span className="font-['Montserrat'] text-2xl font-bold">
      <span className={serviColor}>servi</span>
      <span className={passColor}>pass</span>
    </span>
  );
};

export default Logo;