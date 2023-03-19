export const checkEditMode = (data: any) => {
    const task = data.filter((task: any) => task.editing === true)
    if (task.length > 0) {
        return task[0];
    } else return false;
}