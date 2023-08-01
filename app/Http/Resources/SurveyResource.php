<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SurveyResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // return parent::toArray($request);
        return [
          'id' => $this->id,
          'title' => $this->title,
          'slug' => $this->slug,
          'status' => $this->status !== 'draft',
          'description' => $this->description,
          'created_at' => $this->created_at,
          'updated_at' => $this->updated_at,
          'expired_at' => $this->expired_at,
          'questions' => []  
        ];
    }
}
