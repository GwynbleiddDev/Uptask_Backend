import { transporter } from "../config/nodemailer"


interface IEmail {
  email: string
  name: string
  token: string
}


export class AuthEmail {

  static sendConfirmationEmail = async ( user: IEmail ) => {
    await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Confirma tu cuenta',
      text: 'UpTask - Confirma tu cuenta',
      html:`<p>Hola ${user.name}, has creado tu cuenta en UpTask, ya casi   esta todo listo, solo debes confirmar tu cuenta</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/confirm-account">Confirma tu cuenta</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 20 minutos</p>
      `
    })
  }


  static sendPasswordResetToken = async ( user: IEmail ) => {
    await transporter.sendMail({
      from: 'UpTask <admin@uptask.com>',
      to: user.email,
      subject: 'UpTask - Reestablece tu Password',
      text: 'UpTask - Reestablece tu Password',
      html:`<p>Hola ${user.name}, has solicitado reestablecer tu password.</p>
        <p>Visita el siguiente enlace:</p>
        <a href="${process.env.FRONTEND_URL}/auth/new-password">Reestablece tu Password</a>
        <p>E ingresa el codigo: <b>${user.token}</b></p>
        <p>Este token expira en 20 minutos</p>
      `
    })
  }
}