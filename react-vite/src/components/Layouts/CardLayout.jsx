const CardLayout = (props) => {
  const { children } = props;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-7">
      {children}
    </div>
  );
};

export default CardLayout;
