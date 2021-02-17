import React, { useState, useEffect, useContext } from 'react'
import { asyncCreateQuestion, asyncGetQuestions, asyncPatchQuestion, asyncDeleteQuestion } from '../api/QuestionAPI'
import { asyncGetAnswers, asyncDeleteAnswer, asyncPatchAnswer } from '../api/AnswerAPI'
import { UserContext } from '../contexts/UserContext'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: '#323232',
      height: '100vh',
      width: '100%',
    },
    paper: {
      padding: theme.spacing(2),
      margin: '100px 3vw 10px',
      textAlign: 'center',
      color: theme.palette.text.secondary,
      height: '100px',
      width: '1fr',
    },
  }),
);


const Question: React.FC = () => {
  interface QUESTION {
    id: number; question_text: string; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  interface ANSWER {
    id: number; answer_text: string; question: number; owner: number; owner_name: string; created_at: number; updated_at: number;
  }

  const classes = useStyles();
  const profile = useContext(UserContext)
  const [questions, setQuestions] = useState<QUESTION[]>([])
  const [myQuestions, setMyQuestions] = useState<QUESTION[]>([])
  const [questionText, setQuestionText] = useState("")
  const [editQuestion, setEditQuestion] = useState("")
  const [questionEditId, setQuestionEditId] = useState(0)
  const [questionDeleteId, setQuestionDeleteId] = useState(0)

  const [answers, setAnswers] = useState<ANSWER[]>([])
  const [editAnswer, setEditAnswer] = useState("")
  const [answerText, setAnswerText] = useState("")
  const [answerEditId, setAnswerEditId] = useState(0)
  const [answerDeleteId, setAnswerDeleteId] = useState(0)

  const getQuestions = async () => {
    const result: QUESTION[] = await asyncGetQuestions()
    const tmp: QUESTION[] = result.filter(q => q.owner === profile?.id)
    setQuestions(result)
    setMyQuestions(tmp)
   }

  const postQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncCreateQuestion({question_text: questionText})
    setQuestionText("")
  }

  const updateQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchQuestion({id: questionEditId, question_text: editQuestion})
    setEditQuestion("")
    setQuestionEditId(0)
  }

  const deleteQuestion = async (id: number) => {
    await asyncDeleteQuestion(id)
    setQuestionDeleteId(id)
  }


  const getAnswers = async () => {
    const result: ANSWER[] = await asyncGetAnswers()
    setAnswers(result)
  }

  const check_match_qa_id = (questionId: number, answerId: number) => {
    if (questionId === answerId){
      return true
    }
    return false
  }

  const updateAnswer = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await asyncPatchAnswer({id: answerEditId, answer_text: editAnswer})
    setEditAnswer("")
    setAnswerEditId(0)
  }

  const deleteAnswer = async (id: number) => {
    await asyncDeleteAnswer(id)
    setAnswerDeleteId(id)
  }

  useEffect(() => {
    getQuestions()
    getAnswers()
  }, [questionEditId, questionDeleteId, questionText, profile, answerDeleteId, answerEditId, answerText])

  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12}>
        <Grid container spacing={2}>
        {
          questions.map(question =>
            <Grid key={question.id} item xs={4}>
              <Paper className={classes.paper} key={question.id}>
                <div>{question.owner_name}</div>
                <div>{question.updated_at}</div>
                <div>{question.question_text}</div>
              </Paper>
            </Grid>
          )
        }
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Question