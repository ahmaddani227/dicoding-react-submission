const SectionLayout = (props) => {
  const { children, title } = props;

  return (
    <section className="container py-5">
      <h1 className="mb-3 text-2xl font-semibold">{title}</h1>

      {children}
    </section>
  );
};

export default SectionLayout;
