package domain_test

import (
	"time"

	"github.com/stretchr/testify/require"

	"encoder/domain"
	"testing"
)

func TestValidateIfVideoIsEmpty(t *testing.T) {
	video := domain.NewVideo()
	err := video.Validate()
	require.Error(t, err)
}

func TestVideoIdIsNotAnUuid(t *testing.T) {
	video := domain.NewVideo()

	video.ID = "not-an-uuid"
	video.ResourceID = "a"
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	err := video.Validate()
	require.Error(t, err)
}

func TestVideoValidation(t *testing.T) {
	video := domain.NewVideo()

	video.ID = "76542ea6-8aef-43e4-be33-9d0cf734c9a5"
	video.ResourceID = "a"
	video.FilePath = "path"
	video.CreatedAt = time.Now()

	err := video.Validate()
	require.Nil(t, err)
}
