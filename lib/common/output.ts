interface Output<T> {
    onSuccess: (result: T) => void
    onError: (err: any) => void
}