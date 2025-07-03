const Loading = () => {
    return <>
      <section className="fixed top-0 right-0 w-screen h-screen bg-black/50">
          <div className="absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded p-16">
              <div className="spinner"></div>
          </div>
      </section>
    </>;
  };
  
  export default Loading;
  