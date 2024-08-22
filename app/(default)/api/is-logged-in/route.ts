import { NextResponse } from 'next/server';
import { fetchAPINoAuth } from '@api/fetch-api-no-auth';

export async function POST(req: Request) {
  const { username, password } = await req.json();
  const data = await fetchAPINoAuth(
    /* GraphQL */
    `
      mutation LoginUser($username: String = "", $password: String = "") {
        login(input: { username: $username, password: $password }) {
          authToken
          refreshToken
        }
      }
    `,
    {
      variables: { username, password },
    }
  );

  return NextResponse.json({ data });
}
