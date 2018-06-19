export default () => {
  return (
    <div className='page-loading'>
      <img src='./static/dot-loader-black.svg' />

      <style jsx>{`
        .page-loading {
          flex-grow:1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        img {
          width: 100px;
        }
      `}</style>
    </div>
  );
};
