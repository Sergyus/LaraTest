<?php

namespace App\Http\Controllers\Api\V1;

use App\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller {
    /**
     * Display a listing of the resource.
     *
     * @return Comment[]|\Illuminate\Database\Eloquent\Collection
     */
    public function index() {
        return Comment::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create() {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     *
     * @return Comment|\Illuminate\Database\Eloquent\Model
     */
    public function store(Request $request) {
        $comment = Comment::create($request->all());

        print_r($comment);

        return $comment;
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function show($id) {
        return Comment::findOrFail($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id) {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    public function update(Request $request, $id) {
        $comment = Comment::findOrFail($id);
        $comment->update($request->all());

        return $comment;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     *
     * @return string
     * @throws \Exception
     */
    public function destroy($id) {
        $comment = Comment::findOrFail($id);
        $comment->delete();
        return '';
    }
}
