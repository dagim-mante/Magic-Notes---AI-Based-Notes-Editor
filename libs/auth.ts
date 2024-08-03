import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'email@gmail.com'},
                password: {label: 'Password', type: 'password'}
            },
            async authorize(credentials, req){
                return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
            }
        })
    ]
}