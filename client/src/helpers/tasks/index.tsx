export const getEditableTask = (data: any) => {
    const task = data.filter((task: any) => task.status === false)
    if (task.length > 0) {
        return task[0];
    } else {
        return false;
    }
}