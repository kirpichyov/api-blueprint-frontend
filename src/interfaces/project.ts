interface IProject {
    id: string,
    name: string,
    description: string,
    imageUrl: string,
    updatedAtUtc: Date,
    membersCount: number
}

export default IProject;