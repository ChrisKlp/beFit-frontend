/* eslint-disable no-console */
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function Page404() {
  const error = useRouteError();
  console.error(error);

  return (
    <main className="grid w-full place-items-center bg-black/95 bg-[url('@/assets/home/desktop/pattern-circles.svg')] bg-cover bg-center bg-no-repeat">
      <section className="c-container grid w-full place-items-center gap-4 py-80">
        <h1 className="h1 text-white">Oops!</h1>
        <p className="h5 mb-10 text-center font-light lowercase text-white/50">
          Sorry, an unexpected error has occurred.
        </p>
        {isRouteErrorResponse(error) && (
          <>
            <h2 className="h2 text-orange">{error.status}</h2>
            <p className="text-base text-orange">{error.statusText}</p>
            {error.data?.message && (
              <p className="text-center text-base text-white/50">
                {error.data.message}
              </p>
            )}
          </>
        )}
      </section>
    </main>
  );
}
