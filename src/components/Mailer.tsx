import { useEffect, useRef, useState } from 'react'
import downloadSvg from '../assets/download.svg'
import test_emails from '../assets/test_emails.txt'
import email_content_example from '../assets/email_content_example.txt'
import { allowBtn, shakeInput } from '../utils/utils'

const Mailer = () => {
  const [emailContent, setEmailContent] = useState<string>('')
  const [emailListPath, setEmailListPath] = useState<string>('')
  const [emailList, setEmailList] = useState<string>('')
  const [exampleEmail, setExampleEmail] = useState<string>('')
  const emailContentRef = useRef<HTMLTextAreaElement>()
  const emailListRef = useRef<HTMLInputElement>()
  const checkMailRef = useRef<HTMLButtonElement>()
  const sendBtnRef = useRef<HTMLButtonElement>()

  const downloadFile = (fileLink: string) => {
    // get file from assets and download
    const link = document.createElement('a')
    link.href = fileLink
    link.download = fileLink.split('/').pop()!
    link.click()
  }

  const readContent = (
    e: React.ChangeEvent<HTMLInputElement & { target: { files?: FileList } }>
  ) => {
    const emailListPath = e.target.value
    const file = e.target.files?.[0] // eslint-disable-line
    setEmailListPath(emailListPath as string)
    // read file content
    const reader = new FileReader()
    reader.onload = async (e) => {
      const text = e.target?.result
      setEmailList(text as string)
    }
    reader.readAsText(file as Blob)
  }

  const prepareEmail = (list: string) => {
    let exampleContentEmail = emailContent
    // prepare email
    list.split('\n').map((line: string) => {
      const [email, name, ...rest] = line.split(';').map((item) => item.trim())
      if (email && name) {
        exampleContentEmail = emailContent.replace(/{{name}}/g, name)
        rest.map((item) => {
          const pattern = new RegExp('\\{\\{.*?\\}\\}', 'g')
          exampleContentEmail = exampleContentEmail.replace(pattern, item)
        })
      }
    })
    setExampleEmail(exampleContentEmail)
  }

  const checkMail = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (!emailContent || !emailList) {
      shakeInput(emailContentRef.current!, false)
      shakeInput(emailListRef.current!, false)
      return
    }
    // check if emailContent has any {{}} and if emailList has any emails
    if (exampleEmail.includes('{{') && emailList) {
      return true
    }
    shakeInput(checkMailRef.current!, true)
    allowBtn(sendBtnRef.current!)
    return
  }

  useEffect(() => {
    prepareEmail(emailList)
  }, [emailList])

  return (
    <main className="flex-1 flex items-center justify-center text-white bg-slate-600">
      {/* Grid Form */}
      <form className="grid gap-4 m-4 p-4 bg-slate-700 rounded-md shadow-md w-full">
        {/* <button className="w-full p-2 text-white bg-slate-800 rounded-md hover:bg-slate-900">
          1. Authorize with Gmail
        </button> */}
        <div className="flex items-center gap-2 justify-start">
          <label htmlFor="email">
            Email <span className="text-xs">(Email content example)</span>
          </label>
          {/* download svg */}
          <img
            src={downloadSvg}
            className="h-5 bg-white rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => {
              downloadFile(email_content_example)
            }}
          ></img>
        </div>
        <textarea
          placeholder="Text of the email here"
          className="p-2 bg-slate-800 rounded-md"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          ref={emailContentRef as React.RefObject<HTMLTextAreaElement>}
        />
        <div className="flex items-center gap-2 justify-start">
          <label htmlFor="password">
            Email List <span className="text-xs">(Email list example)</span>
          </label>
          {/* download svg */}
          <img
            src={downloadSvg}
            className="h-5 bg-white rounded-md cursor-pointer hover:bg-gray-200"
            onClick={() => {
              downloadFile(test_emails)
            }}
          ></img>
        </div>
        <input
          type="file"
          className="p-2 bg-slate-800 rounded-md"
          value={emailListPath}
          onChange={readContent}
          ref={emailListRef as React.RefObject<HTMLInputElement>}
        ></input>
        {emailList && (
          <div className="p-2 bg-slate-800 text-white h-24 overflow-auto">
            {emailList.split('\n').map((email, index) => {
              return <div key={index}>{email}</div>
            })}
          </div>
        )}
        {exampleEmail && (
          <div className="p-2 bg-slate-800 text-white overflow-auto whitespace-pre-line h-32">
            {exampleEmail}
          </div>
        )}
        <button
          className="w-full p-2 text-white bg-slate-800 rounded-md hover:bg-slate-900"
          onClick={checkMail}
          ref={checkMailRef as React.RefObject<HTMLButtonElement>}
        >
          Check Mail
        </button>
        <button
          type="submit"
          className="w-full p-2 text-white bg-rose-800 rounded-mdhover:bg-slate-900"
          disabled
          ref={sendBtnRef as React.RefObject<HTMLButtonElement>}
        >
          Send
        </button>
      </form>
    </main>
  )
}

export default Mailer
