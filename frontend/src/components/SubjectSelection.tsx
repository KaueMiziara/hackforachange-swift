import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

interface Subject {
    id: number;
    name: string;
}

const SubjectSelection: React.FC = () => {
    const {gradeID} = useParams<{gradeID: string}>();
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/subjects/${gradeID}`)
            .then((response) => response.json())
            .then((data) => setSubjects(data))
            .catch((error) => console.error("Error fetching subjects ", error));
    }, [gradeID]);

    return (
        <div>
            <h2>Matérias para a {gradeID}ª Série:</h2>
            <div className="grades-container">
                {subjects.map((subject) => (
                    <Link key={subject.id} to={`/lessons-and-exercises/${gradeID}/${subject.id}`}>
                        <ListItem name={subject.name} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SubjectSelection;
