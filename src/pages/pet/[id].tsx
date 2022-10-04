import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import { z } from "zod";
import { Breed } from "../../types";

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch("https://apimocha.com/aboutdogs/v1/breeds", {
    headers: {
      "x-api-key": `${process.env.API_KEY}`,
    },
  }).then((res) => res.json());

  const allBreeds: Breed[] = response;

  return {
    paths: allBreeds?.map((breed) => ({
      params: { id: breed.id.toString() },
    })),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<{
  breed: Breed;
}> = async ({ params }) => {
  const response = await fetch(`https://apimocha.com/aboutdogs/v1/breeds`, {
    headers: {
      "x-api-key": `${process.env.API_KEY}`,
    },
  }).then((res) => res.json());

  const parseId = z.number().parse(Number(params?.id));

  const breedWithId = response[parseId - 1];

  return {
    props: { breed: breedWithId },
    revalidate: 2000,
  };
};

const Id = ({ breed }: InferGetStaticPropsType<typeof getStaticProps>) => {
  if (!breed) {
    return <div>xd</div>;
  }

  return (
    <div className="min-h-screen space-y-6 bg-base-200">
      <nav className="mx-auto max-w-4xl pt-8">
        <Link href="/">
          <a className="btn btn-primary btn-sm normal-case md:btn-md lg:gap-3">
            <svg
              className="h-6 w-6 fill-current md:h-8 md:w-8"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
            </svg>{" "}
            <div className="flex flex-col items-start">
              <span className="text-md hidden font-normal md:block">
                Go back
              </span>{" "}
              <span>Home</span>
            </div>
          </a>
        </Link>
      </nav>

      <main className="mx-auto grid max-w-4xl grid-cols-2 justify-between gap-5 rounded-xl bg-base-100 p-8">
        <section className="space-y-4 text-lg">
          <h1 className="border-b-4 border-primary text-3xl font-semibold">
            {breed?.name}
          </h1>
          <div className="grid grid-cols-2 space-y-1">
            <p className="">Height:</p>
            <span className="">{breed?.height.metric}</span>
            <p className="">Life Span:</p>
            <span className="">{breed?.life_span}</span>

            {breed?.origin && (
              <>
                <p className="">Origin: </p>
                <span className="">{breed?.origin}</span>
              </>
            )}

            <p className="">Temperament:</p>
            <span className="">{breed?.temperament}</span>

            <p className="">Nice for:</p>
            <span>{breed?.bred_for}</span>
          </div>
        </section>
        <Image
          className="radius-lg"
          src={breed?.image?.url}
          width={500}
          height={333.33}
          alt="Dog"
        />
      </main>
    </div>
  );
};
export default Id;
