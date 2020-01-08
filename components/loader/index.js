import style from './style';

export default () => {
  return (
    <div className='page-loading'>
      <img src='/dot-loader-black.svg' />

      <style jsx>{ style }</style>
    </div>
  );
};
